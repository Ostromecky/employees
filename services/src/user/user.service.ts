import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';
import { Repository } from 'typeorm';
import { DataDto } from '../shared/dto/data.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryDto } from './dto/query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByQuery(query: QueryDto): Promise<any> {
    const take = query.take || 10;
    const skip = query.skip || 0;
    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (query.firstName) {
      queryBuilder.andWhere('user.firstName like :firstName', {
        firstName: '%' + query.firstName + '%',
      });
    }
    if (query.lastName) {
      queryBuilder.andWhere('user.lastName like :lastName', {
        lastName: '%' + query.lastName + '%',
      });
    }
    if (query.isActive) {
      queryBuilder.andWhere('user.isActive = :isActive', {
        isActive: query.isActive,
      });
    }

    const [result, total] = await queryBuilder
      .take(take)
      .skip(skip)
      .getManyAndCount();

    return new DataDto({
      data: result.map(
        (user: User) =>
          new UserDto({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            isActive: user.isActive,
          }),
      ),
      count: total,
    });
  }

  async findForAuth(userName: string): Promise<User | undefined> {
    const user = await this.usersRepository
      .createQueryBuilder('user')
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

  async remove(id: number): Promise<void> {
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

  async updateUser(userId: number, dto: UpdateUserDto): Promise<User> {
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
