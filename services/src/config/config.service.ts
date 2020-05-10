import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class ConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres' as 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'employees',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
