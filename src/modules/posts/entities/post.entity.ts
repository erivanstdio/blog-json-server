import { BaseEntity } from 'src/common/entities/base.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  @Column()
  title: string;

  @Column('text')
  content: string;

  @ManyToMany(() => Tag, (tag) => tag.posts, { cascade: true })
  @JoinTable() // Cria a tabela de junção post_tags
  tags: Tag[];
}
