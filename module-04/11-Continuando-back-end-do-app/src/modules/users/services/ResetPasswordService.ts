import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import { addHours, differenceInHours, isAfter } from 'date-fns';

interface IRequest {
 token: string;
 password: string;
}

@injectable()
class ResetPasswordService {
 constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,

  @inject('UserTokensRepository')
  private usersTokensRepository: IUserTokensRepository,

  @inject('HashProvider')
  private hashProvider: IHashProvider,
 ) { }

 public async execute({ token, password }: IRequest): Promise<void> {
  const userToken = await this.usersTokensRepository.findByToken(token);

  if(!userToken) {
   throw new AppError('User token does not exists');
  }
  
  const user = await this.usersRepository.findById(userToken.user_id);

  if(!user) {
   throw new AppError('User token does not exists');
  }

  const tokenCreatedAt = userToken.created_at;
  const compareDate = addHours(tokenCreatedAt, 2);

  if (isAfter(Date.now(), compareDate)) {
   throw new AppError('Token expired');
  }

  user.password = await this.hashProvider.generateHash(password);

  await this.usersRepository.save(user);
 }
}

export default ResetPasswordService;
