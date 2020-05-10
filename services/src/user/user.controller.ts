import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }
}
