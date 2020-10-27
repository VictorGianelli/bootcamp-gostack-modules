import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
    it('should be able to authenticate', async () => {
        const fakeUsersReposirory = new FakeUsersReposirory();
        const fakeHashProvider = new FakeHashProvider();

        const createUser = new CreateUserService(
            fakeUsersReposirory,
            fakeHashProvider
            
        )
        const authenticateUser = new AuthenticateUserService(
            fakeUsersReposirory,
            fakeHashProvider
        )

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123123'
        });

        const resonse = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123123123'
        })

        expect(resonse).toHaveProperty('token');
        expect(resonse.user).toEqual(user);
    });

})