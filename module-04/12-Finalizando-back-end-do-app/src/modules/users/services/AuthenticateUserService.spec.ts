import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersReposirory: FakeUsersReposirory;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersReposirory = new FakeUsersReposirory();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(
            fakeUsersReposirory,
            fakeHashProvider

        )
        authenticateUser = new AuthenticateUserService(
            fakeUsersReposirory,
            fakeHashProvider
        )
    })

    it('should be able to authenticate', async () => {
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

    it('should`nt be able to authenticate with a non exixsting user', async () => {
        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123123123'
        })).rejects.toBeInstanceOf(AppError);

    });

    it('should`nt be able to authenticate with wrong password', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'wrong-password',
        }),
        ).rejects.toBeInstanceOf(AppError);
    });
})