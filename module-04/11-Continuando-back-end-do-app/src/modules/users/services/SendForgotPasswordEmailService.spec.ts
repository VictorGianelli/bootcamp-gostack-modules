import FakeUsersReposirory from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

describe('SendForgotPasswordEmailService', () => {
  it('should be able to recover the password using email', async () => {
    const fakeUsersReposirory = new FakeUsersReposirory();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersReposirory,
      fakeMailProvider
    )

    await fakeUsersReposirory.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123123123'
    })

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@example.com',
    })

    expect(sendMail).toHaveBeenCalled();
  });
})