import { Entity, Column, OneToMany } from 'typeorm';
import { Publication } from 'src/modules/publications/entities/publication.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity('users') // (opcional) define o nome da tabela como 'users'
export class User extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Publication, (post) => post.author.id)
  publications?: Publication[];
}
