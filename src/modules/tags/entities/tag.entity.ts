import { BlogPost } from 'src/modules/blog-posts/entities/blog-post.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';


@Entity()
export class Tag  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => BlogPost, (post) => post.tags)
  blogPosts: BlogPost[];
}
