import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to upload image', async () => {
    const fakeUsersReposirory = new FakeUsersReposirory();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersReposirory,
      fakeStorageProvider
    )

    const user = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should`nt be able to upload image from non existing user', async () => {
    const fakeUsersReposirory = new FakeUsersReposirory();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersReposirory,
      fakeStorageProvider
    )

    await expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFileName: 'avatar.jpg',
    }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when it is changed', async () => {
    const fakeUsersReposirory = new FakeUsersReposirory();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersReposirory,
      fakeStorageProvider
    )

    const user = await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    })

    expect(deleteFile).toBeCalledWith('avatar.jpg')

    expect(user.avatar).toBe('avatar2.jpg');
  });
})