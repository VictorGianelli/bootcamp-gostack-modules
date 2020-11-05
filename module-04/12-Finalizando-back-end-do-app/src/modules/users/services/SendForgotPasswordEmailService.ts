import { injectable, inject } from 'tsyringe';
import path from 'path';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

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

  const { token } = await this.usersTokensRepository.generate(user.id)

  const forgotPasswordTemplate = path.resolve(
   __dirname,
   '..',
   'views',
   'forgot_password.hbs',
  )

  await this.mailProvider.sendMail({
   to: {
    name: user.name,
    email: user.email,
   },
   subject: '[GoBarber] Recuperação de Senha',
   templateData: {
    file: forgotPasswordTemplate,
    variables: {
     name: user.name,
     link: `http://localhost:3000/redet_password=${token}`,
    }
   }
  })
 }
}

export default SendForgotPasswordEmailService;