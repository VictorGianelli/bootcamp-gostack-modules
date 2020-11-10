import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersReposirory: FakeUsersReposirory;
let fakeHashProvider: FakeHashProvider ;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersReposirory = new FakeUsersReposirory();
    fakeCacheProvider = new FakeCacheProvider();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersReposirory,
      fakeHashProvider,
      fakeCacheProvider
    )

  })
  
  it('should be able to create a new user', async () => {

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {

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