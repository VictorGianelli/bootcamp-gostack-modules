import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '../../typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService(usersRepository);
  const usersRepository = new UserRepository();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionsRouter;
