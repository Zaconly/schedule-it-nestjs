import { generate } from "shortid"
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

export abstract class BaseContent extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ unique: true })
  shortUrl: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  setShortUrl(): void {
    this.shortUrl = generate()
  }
}
