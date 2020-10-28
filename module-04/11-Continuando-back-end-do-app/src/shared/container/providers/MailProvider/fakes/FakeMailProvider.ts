import IMailProvider from '../models/IMailProvider';
import IStorageProvider from '../models/IMailProvider';

interface IMessage {
  to: string,
  body: string,
}

export default class FakeMailProvider implements IMailProvider {
  private mensages: IMessage[] = []

  public async sendMail(to: string, body: string): Promise<void> {
    this.mensages.push({
      to,
      body,
    });
  }


}