import { Column, Entity, ManyToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { BlogPost } from 'src/modules/blog-posts/entities/blog-post.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => BlogPost, (post) => post.tags)
  blogPosts: BlogPost[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeName() {
    this.name = this.name.toLowerCase();
  }
}
