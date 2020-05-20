import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UsersService } from 'src/user/user.service';
import { CreateSessionDto } from './dto/create-session.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(dto: CreateSessionDto): Promise<User> {
    const user = await this.usersService.findForAuth(dto.userName);
    if (user) {
      const valid = await bcryptjs.compare(dto.password, user.password);
      if (valid) {
        delete user.password;
        return user;
      }
    }
    throw new NotFoundException();
  }

  async login(user: User) {
    const payload = { userName: user.userName, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
