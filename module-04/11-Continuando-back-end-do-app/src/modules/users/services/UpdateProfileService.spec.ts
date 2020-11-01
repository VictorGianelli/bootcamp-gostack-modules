import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfile from './UpdateProfileService';

let fakeUsersReposirory: FakeUsersReposirory;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfile

describe('UpdateProfileAvatar', () => {
  beforeEach(() => {
    fakeUsersReposirory = new FakeUsersReposirory();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfile(
      fakeUsersReposirory,
      fakeHashProvider
    )

  })

  it('should be able to upload the profile', async () => {

    const user = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Uno',
      email: 'johnuno@example.com',
    })

    expect(updatedUser.name).toBe('John Uno');
    expect(updatedUser.email).toBe('johnuno@example.com');
  });

  it('should be able to change a existen email', async () => {
    await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123'
    })

    const user = await fakeUsersReposirory.create({
      name: 'Test',
      email: 'teste@example.com',
      password: '123123'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'John Uno',
      email: 'johndoe@example.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to upload the password ', async () => {

    const user = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'John Uno',
      email: 'johnuno@example.com',
      old_password: '123456',
      password: '123123',
    })

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to upload the password without the old one ', async () => {

    const user = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect( updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to upload the password with wrong old one ', async () => {

    const user = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect( updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      old_password: 'wrong-old-password',
      password: '123123',
    })).rejects.toBeInstanceOf(AppError);
  });

})