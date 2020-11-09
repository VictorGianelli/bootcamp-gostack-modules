import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';
import SESMailProvider from './MailProvider/implementations/SESMailProvider';
import IMailProvider from './MailProvider/models/IMailProvider';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './StorageProvider/models/IStorageProvider';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerInstance<IMailTemplateProvider>(
  'MailTemplateProvider',
  new HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  mailConfig.driver === 'ethereal' 
  ? container.resolve(EtherealMailProvider)
  : container.resolve(SESMailProvider),
);
