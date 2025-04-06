import { Post } from 'src/modules/posts/entities/post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity()
export class Tag  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];
}
