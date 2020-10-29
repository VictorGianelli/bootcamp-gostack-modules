import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
 email: string;
}

@injectable()
class SendForgotPasswordEmailService {
 constructor(
  @inject('UsersRepository')
  private usersRepository: IUsersRepository,
  
  @inject('MailProvider')
  private mailProvider: IMailProvider,
  
  @inject('UserTokensRepository')
  private usersTokensRepository: IUserTokensRepository,
 ) { }

 public async execute({ email }: IRequest): Promise<void> {
  const user = await this.usersRepository.findByEmail(email);

  if (!user) {
   throw new AppError('User does not exists', 401);
  }

  await this.usersTokensRepository.generate(user.id)

  this.mailProvider.sendMail(
   email,
   'Pedido de recuperação de senha recebido'
  )
 }
}

export default SendForgotPasswordEmailService;
