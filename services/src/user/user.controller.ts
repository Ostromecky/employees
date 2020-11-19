import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { DataDto } from '../shared/dto/data.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryDto } from './dto/query.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.createUser(createUserDto);
  }

  @UseGuards(new JwtAuthGuard())
  @ApiOperation({ summary: 'Fetch users using query' })
  @Get()
  async findByQuery(@Query() queryDto: QueryDto): Promise<DataDto<UserDto>> {
    const query = plainToClass(QueryDto, queryDto);
    return await this.usersService.findByQuery(query);
  }

  @UseGuards(new JwtAuthGuard())
  @Delete()
  async deleteUser(@Body() userDto: UserDto) {
    return await this.usersService.remove(userDto.id);
  }
}
