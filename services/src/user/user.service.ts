import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/user.dto';

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

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  createUser(newUser: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(newUser);
    const savedUser = this.usersRepository.save(user);
    return savedUser;
  }
}
