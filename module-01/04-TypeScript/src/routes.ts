import { Request, Response} from 'express'
import createUser from './services/CreateUser'

export function helloWorld(request: Request,response: Response){
  const user = createUser({
    email: 'victor@mail.com',
    password: '123456',
    techs: [
      'Node.js',
      'React Native',
      'ReactJS',
      { title: 'Java', experience: 85}
    ]
  });

  return response.json({ mensage : 'Hello World!'});
}