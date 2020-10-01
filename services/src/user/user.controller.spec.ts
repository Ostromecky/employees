import { Test, TestingModule } from '@nestjs/testing';
import { DataDto } from '../shared/dto/data.dto';
import { QueryDto } from './dto/query.dto';
import { UserController } from './user.controller';
import { UsersService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let usersService: UsersService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UsersService],
    }).compile();

    userController = app.get<UserController>(UserController);
    usersService = app.get<UsersService>(UsersService);
  });

  describe('find users by query', () => {
    it('should return user list response', () => {
      const result = new DataDto({
        data: [],
        count: 0,
      });
      jest
        .spyOn(usersService, 'findByQuery')
        .mockReturnValue(Promise.resolve({ result }));
      expect(userController.findByQuery(new QueryDto())).toEqual(result);
    });
  });
});
