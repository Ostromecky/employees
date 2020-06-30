import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DataDto } from '../shared/dto/data.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryDto } from './dto/query.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  // @UseGuards(new JwtAuthGuard())
  @Get()
  async findByQuery(@Query() queryDto: QueryDto): Promise<DataDto<UserDto>> {
    return await this.usersService.findByQuery(queryDto);
  }

  @UseGuards(new JwtAuthGuard())
  @Delete()
  async deleteUser(@Body() userDto: UserDto) {
    return await this.usersService.remove(userDto.id);
  }
}
