
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
  @Column()
  title: string;
}
