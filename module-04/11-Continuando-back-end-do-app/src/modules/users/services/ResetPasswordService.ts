import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

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
 ) { }

 public async execute({ token, password }: IRequest): Promise<void> {
  const userToken = await this.usersTokensRepository.findByToken(token);

  if(!userToken) {
   throw new AppError('user token does not exists', 401);
  }
  
  const user = await this.usersRepository.findById(userToken.user_id);

  if(!user) {
   throw new AppError('user token does not exists', 401);
  }

  user.password = password;

  await this.usersRepository.save(user);
 }
}

export default ResetPasswordService;
