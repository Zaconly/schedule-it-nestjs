import { Field, ObjectType } from "@nestjs/graphql"
import { Length } from "class-validator"
import slugify from "slugify"
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from "typeorm"

import { User } from "../users/user.entity"
import { BaseContent } from "../utils/entity/BaseContent"

@ObjectType()
@Entity("boards")
export class Board extends BaseContent {
  @Field()
  @Length(1, 30)
  @Column({ length: 30 })
  name: string

  @Field()
  @Column({ default: false })
  isArchived: boolean

  @Field()
  @Column()
  slug: string

  @Field(type => User)
  @ManyToOne(target => User, user => user.boards, { nullable: false })
  user: User

  @BeforeInsert()
  @BeforeUpdate()
  setSlug(): void {
    this.slug = slugify(this.name)
  }
}
