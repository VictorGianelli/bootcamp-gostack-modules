import AppError from '@shared/errors/AppError';
import FakeUsersReposirory from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersReposirory: FakeUsersReposirory;
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersReposirory = new FakeUsersReposirory();

    listProviders = new ListProvidersService(
      fakeUsersReposirory
    )

  })

  it('should be able to list the providers', async () => {

    const user1 = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    const user2 = await fakeUsersReposirory.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123123123'
    })

    const loggedUser = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([
      user1,
      user2,
    ]);
  });

})