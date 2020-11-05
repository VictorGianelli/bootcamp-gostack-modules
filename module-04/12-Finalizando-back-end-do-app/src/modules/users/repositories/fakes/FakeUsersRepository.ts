import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';
import { v4 as uuid } from 'uuid';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

class UserRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(
      user => user.id === id,
    )

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(
      user => user.email === email,
    )

    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let {users} = this;

    if (except_user_id) {
      users = this.users.filter(user => user.id !== except_user_id)
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(
      findIndex => findIndex.id === user.id,
    )

    this.users[findIndex] = user;

    return user;
  }
}

export default UserRepository;