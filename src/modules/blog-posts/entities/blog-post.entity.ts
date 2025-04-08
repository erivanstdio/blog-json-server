import { UUID } from 'crypto';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class BlogPost extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Tag, (tag) => tag.blogPosts, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.blogPosts, { eager: true })
  @JoinColumn({ name: 'authorId' }) // conecta o campo acima como FK
  author: User;
}
