import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNumber } from 'class-validator';

export class QueryDto {
  @ApiPropertyOptional({ name: 'firstName', example: 'Jon' })
  firstName: string;

  @ApiPropertyOptional({ name: 'lastName', example: 'Jon' })
  lastName: string;

  @IsBoolean()
  @Type(() => Boolean)
  @ApiPropertyOptional({ name: 'isActive', example: true })
  isActive: boolean;

  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ name: 'take', example: 5 })
  take: number;

  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional({ name: 'skip', example: 5 })
  skip: number;

  constructor(query?: QueryDto) {
    if (query) {
      this.firstName = query.firstName;
      this.lastName = query.lastName;
      this.isActive = query.isActive;
      this.take = query.take;
      this.skip = query.skip;
    }
  }
}
