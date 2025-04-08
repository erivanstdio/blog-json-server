import { UUID } from "crypto";
import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @CreateDateColumn({ name: 'deleted_at' })
  deletedAt: Date
}