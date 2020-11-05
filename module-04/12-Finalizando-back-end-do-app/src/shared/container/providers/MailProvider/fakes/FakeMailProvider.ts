import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

export default class FakeMailProvider implements IMailProvider {
  private mensages: ISendMailDTO[] = []

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.mensages.push(message);
  }
}