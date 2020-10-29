// import User from '../infra/typeorm/entities/User';
// import ICreateUserDTO from '../dtos/ICreateUserDTO';
import UserToken from '../infra/typeorm/entities/UserToken';

export default interface IUserTokensRepository {
  // findById(id: string): Promise<User | undefined>;
  // findByEmail(email: string): Promise<User | undefined>;
  // create(data: ICreateUserDTO): Promise<User>;
  generate(user_id: string): Promise<UserToken>;
}
