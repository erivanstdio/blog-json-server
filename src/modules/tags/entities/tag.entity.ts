import { Column, Entity, ManyToMany, BeforeInsert, BeforeUpdate } from 'typeorm';
import { Publication } from 'src/modules/publications/entities/publication.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Tag extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => Publication, (post) => post.tags)
  publications: Publication[];

  @BeforeInsert()
  @BeforeUpdate()
  normalizeName() {
    this.name = this.name.toLowerCase();
  }
}
