import { Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('notifications')
class Notification {
 @ObjectIdColumn('uuid')
 id: string;

 @Column()
 content: string;

 @Column('uuid')
 recipient_id: string;

 @Column({ default: false })
 read: boolean;

 @CreateDateColumn()
 created_at: Date;

 @UpdateDateColumn()
 updated_at: Date;
}

export default Notification;