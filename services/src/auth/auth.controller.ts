import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('sessions')
@Controller('sessions')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  public async authenticate(@Body() createSessionDTO: CreateSessionDto) {
    const validUser = await this.authService.validateUser(createSessionDTO);
    return await this.authService.login(validUser);
  }
}
