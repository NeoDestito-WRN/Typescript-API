import { ICreateUserService } from '@interfaces/domain/user/services/service';
import { inject, injectable } from 'tsyringe';
import { IUserValidator } from '@interfaces/domain/user/services/validation';
import { IRepositoryUser, IUser } from '@interfaces/domain/user/repository';
import { tokens } from '@di/tokens';
@injectable()
export default class CreateUserService implements ICreateUserService {
  constructor(
    @inject(tokens.UserRepository)
    private repository: IRepositoryUser,
    @inject(tokens.UserValidator)
    private validator: IUserValidator,
  ) {}

  public async create(user: IUser): Promise<IUser> {
    await this.validator.validate(user, this.repository.readAll());
    this.repository.create(user);
    return user;
  }
}
