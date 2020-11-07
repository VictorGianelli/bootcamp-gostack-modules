import { ObjectID } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class FakeNotificationsRepository implements INotificationsRepository {
 private notification: Notification[] = [];

 public async create({
  content,
  recipient_id
 }: ICreateNotificationDTO): Promise<Notification> {
  const notification = new Notification();

  Object.assign(notification, { id: ObjectID, content, recipient_id })

  this.notification.push(notification);

  return notification;
 }
}

export default FakeNotificationsRepository;