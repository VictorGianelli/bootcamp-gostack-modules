import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersReposirory = new FakeUsersReposirory();
    const createUser = new CreateUserService(
      fakeUsersReposirory
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    const fakeUsersReposirory = new FakeUsersReposirory();
    const createUser = new CreateUserService(
      fakeUsersReposirory
    )

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    await expect(createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })).rejects.toBeInstanceOf(AppError);
  });
})