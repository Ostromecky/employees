import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, getConnection } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcryptjs from 'bcryptjs';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findByQuery(query: FindManyOptions) {
    const take = query.take || 10;
    const skip = query.skip || 0;
  }

  async findForAuth(userName: string): Promise<User | undefined> {
    const user = await getConnection()
      .createQueryBuilder(User, 'user')
      .addSelect('user.password')
      .where('user.userName = :userName', { userName })
      .getOne();
    return user;
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async createUser(newUser: CreateUserDto): Promise<User> {
    const count: number = await this.usersRepository.count({
      userName: newUser.userName,
    });
    if (count === 0) {
      newUser.password = await this.hashPassword(newUser);
      const user = this.usersRepository.create(newUser);
      const savedUser = await this.usersRepository.save(user);
      delete savedUser.password;

      return savedUser;
    } else {
      throw new ConflictException({
        exists: ['userName'],
      });
    }
  }

  async update(userId: number, dto: UpdateUserDto): Promise<User> {
    if (dto.password) {
      dto.password = await this.hashPassword(dto);
    }
    const userToUpdate = await this.findById(userId);
    const updatedUser = this.usersRepository.merge(userToUpdate, dto);
    await this.usersRepository.save(updatedUser);
    delete updatedUser.password;
    return updatedUser;
  }

  private async hashPassword(
    dto: CreateUserDto | UpdateUserDto,
  ): Promise<string> {
    const salt = await bcryptjs.genSalt();
    return bcryptjs.hash(dto.password, salt);
  }
}
