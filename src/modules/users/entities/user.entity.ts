import { Entity, Column, OneToMany } from 'typeorm';
import { BlogPost } from 'src/modules/blog-posts/entities/blog-post.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('users') // (opcional) define o nome da tabela como 'users'
export class User extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => BlogPost, (post) => post.author.id)
  blogPosts?: BlogPost[];
}
