import { UUID } from 'crypto';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, ManyToMany, JoinTable, ManyToOne } from 'typeorm';

@Entity()
export class BlogPost extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Tag, (tag) => tag.blogPosts, { cascade: true })
  @JoinTable() // join post_tags
  tags: Tag[];

  @ManyToOne(() => User, (user) => user.blogPosts, { eager: true })
  authorId: UUID;
}
