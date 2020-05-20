import { IsString, IsAlpha, IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'demouser' })
  @IsString()
  @IsAlphanumeric()
  readonly userName: string;

  @ApiProperty({ example: 'topsecret' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsAlpha()
  readonly firstName: string;

  @ApiProperty({ example: 'Smith' })
  @IsString()
  @IsAlpha()
  readonly lastName: string;
}
