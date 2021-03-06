import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUsersReposirory: FakeUsersReposirory;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordEmailService', () => {
 beforeEach(() => {
  fakeUsersReposirory = new FakeUsersReposirory();
  fakeUserTokensRepository = new FakeUserTokensRepository();
  fakeHashProvider = new FakeHashProvider();

  resetPassword = new ResetPasswordService(
   fakeUsersReposirory,
   fakeUserTokensRepository,
   fakeHashProvider
  )
 })

 it('should be able to reset the password', async () => {
  const user = await fakeUsersReposirory.create({
   name: 'John Doe',
   email: 'johndoe@example.com',
   password: '123456'
  })

  const { token } = await fakeUserTokensRepository.generate(user.id);

  const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

  await resetPassword.execute({
   password: '123123',
   token,
  })

  const updatedUser = await fakeUsersReposirory.findById(user.id)

  expect(generateHash).toHaveBeenCalledWith('123123');
  expect(updatedUser?.password).toBe('123123');
 });

 it('should`nt be able to reset the password with non-existing token', async () => {
  await expect(
   resetPassword.execute({
    token: 'non-existing-token',
    password: '123456'
   })
  ).rejects.toBeInstanceOf(AppError)
 });

 it('should`nt be able to reset the password with non-existing user', async () => {
  const { token } = await fakeUserTokensRepository.generate('non-existing-user');

  await expect(
   resetPassword.execute({
    token: token,
    password: '123456'
   })
  ).rejects.toBeInstanceOf(AppError)
 });

 it('should`nt able to reset the password if passed 2 hours', async () => {
  const user = await fakeUsersReposirory.create({
   name: 'John Doe',
   email: 'johndoe@example.com',
   password: '123456'
  })

  const { token } = await fakeUserTokensRepository.generate(user.id);

  jest.spyOn(Date, 'now').mockImplementationOnce(() => {
   const customDate = new Date();

   return customDate.setHours(customDate.getHours() + 3);
  })

  await expect( resetPassword.execute({
   password: '123123',
   token,
  }),
  ).rejects.toBeInstanceOf(AppError);

 });

})