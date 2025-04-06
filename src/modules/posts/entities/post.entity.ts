import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;
}
