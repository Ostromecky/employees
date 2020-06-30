import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async authenticate(@Body() createSessionDTO: CreateSessionDto): Promise<any> {
    const validUser = await this.authService.validateUser(createSessionDTO);
    return await this.authService.login(validUser);
  }
}
