import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersReposirory: FakeUsersReposirory;
let fakeUserTokensRepository: FakeUserTokensRepository;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmailService', () => {
 beforeEach(() => {
  fakeUsersReposirory = new FakeUsersReposirory();
  fakeUserTokensRepository = new FakeUserTokensRepository();

  resetPassword = new ResetPasswordService(
   fakeUsersReposirory,
   fakeUserTokensRepository
  )
 })

 it('should be able to reset the password', async () => {
  const user = await fakeUsersReposirory.create({
   name: 'John Doe',
   email: 'johndoe@example.com',
   password: '123456'
  })

  const userToken = await fakeUserTokensRepository.generate(user.id);

  await resetPassword.execute({
   password: '123123',
   token: userToken.token,
  })

  const updatedUser = await fakeUsersReposirory.findById(user.id)

  expect(updatedUser?.password).toBe('123123');
 });

 // it('should be able to recover a non-existing user password', async () => {

 //  await expect(sendForgotPasswordEmail.execute({
 //   email: 'johndoe@example.com',
 //  }),
 //  ).rejects.toBeInstanceOf(AppError);
  
 // });

 // it('should generate a forgot password token', async () => {
 //  const genarationToken = jest.spyOn(fakeUserTokensRepository, 'generate')

 //  const user = await fakeUsersReposirory.create({
 //   name: 'John Doe',
 //   email: 'johndoe@example.com',
 //   password: '123123123'
 //  })

 //  await sendForgotPasswordEmail.execute({
 //   email: 'johndoe@example.com',
 //  })

 //  expect(genarationToken).toHaveBeenCalledWith(user.id);
 // });

})