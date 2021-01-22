import { Field, ObjectType } from "@nestjs/graphql"
import { generate } from "shortid"
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm"

@ObjectType()
export abstract class BaseContent extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Field()
  @Column({ unique: true })
  shortUrl: string

  @Field()
  @CreateDateColumn()
  createdAt: Date

  @Field()
  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  setShortUrl(): void {
    this.shortUrl = generate()
  }
}
