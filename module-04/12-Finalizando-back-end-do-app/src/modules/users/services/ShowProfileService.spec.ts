import AppError from '@shared/errors/AppError';
import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersReposirory: FakeUsersReposirory;
let showProfile: ShowProfileService

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersReposirory = new FakeUsersReposirory();

    showProfile = new ShowProfileService(
      fakeUsersReposirory
    )

  })

  it('should be able to show the profile', async () => {

    const user = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('should not be able to show the profile from a non-existing user', async () => {

    await expect(showProfile.execute({
      user_id: 'non-existing-user-id',
    })).rejects.toBeInstanceOf(AppError);
  });

})