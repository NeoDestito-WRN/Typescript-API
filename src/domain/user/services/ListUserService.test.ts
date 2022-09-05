import container from '@di/index';
import { IVariableDatabase } from '@interfaces/domain/repository';
import { ICustomer } from '@interfaces/domain/user/repository';
import UserRepository from '../repository/UserRepository';
import ListUserService from './ListUserService';

const mockUser = {} as ICustomer;
const databaseMock: IVariableDatabase = new Map<number, ICustomer>().set(
  0,
  mockUser,
);
const listUserService = container.resolve(ListUserService);

describe('ListUserService', () => {
  describe('listAll', () => {
    it('Should return json of users when getting and converting works', () => {
      jest
        .spyOn(UserRepository.prototype, 'readAll')
        .mockReturnValue(databaseMock);
      expect(listUserService.readAll()).toEqual(
        Object.fromEntries(databaseMock),
      );
    });
    it('Should throw error when UserRepository fails', () => {
      jest.spyOn(UserRepository.prototype, 'readAll').mockImplementation(() => {
        throw new Error();
      });
      expect(() => listUserService.readAll()).toThrow();
    });
  });
});
