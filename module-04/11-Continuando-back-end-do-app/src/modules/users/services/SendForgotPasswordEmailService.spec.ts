import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersReposirory: FakeUsersReposirory;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
 beforeEach(() => {
  fakeUsersReposirory = new FakeUsersReposirory();
  fakeMailProvider = new FakeMailProvider();
  fakeUserTokensRepository = new FakeUserTokensRepository();

  sendForgotPasswordEmail = new SendForgotPasswordEmailService(
   fakeUsersReposirory,
   fakeMailProvider,
   fakeUserTokensRepository
  )
 })

 it('should be able to recover the password using email', async () => {

  const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

  await fakeUsersReposirory.create({
   name: 'John Doe',
   email: 'johndoe@example.com',
   password: '123123123'
  })

  await sendForgotPasswordEmail.execute({
   email: 'johndoe@example.com',
  })

  expect(sendMail).toHaveBeenCalled();
 });

 it('should be able to recover a non-existing user password', async () => {

  await expect(sendForgotPasswordEmail.execute({
   email: 'johndoe@example.com',
  }),
  ).rejects.toBeInstanceOf(AppError);
  
 });

 it('should generate a forgot password token', async () => {
  const genarationToken = jest.spyOn(fakeUserTokensRepository, 'generate')

  const user = await fakeUsersReposirory.create({
   name: 'John Doe',
   email: 'johndoe@example.com',
   password: '123123123'
  })

  await sendForgotPasswordEmail.execute({
   email: 'johndoe@example.com',
  })

  expect(genarationToken).toHaveBeenCalledWith(user.id);
 });

})