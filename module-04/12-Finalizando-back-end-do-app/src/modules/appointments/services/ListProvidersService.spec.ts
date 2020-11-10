import FakeUsersReposirory from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersReposirory: FakeUsersReposirory;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersReposirory = new FakeUsersReposirory();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersReposirory,
      fakeCacheProvider
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