import { Length } from "class-validator"
import slugify from "slugify"
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne } from "typeorm"

import { User } from "../users/user.entity"
import { BaseContent } from "../utils/entity/BaseContent"

@Entity("boards")
export class Board extends BaseContent {
  @Length(1, 30)
  @Column({ length: 30 })
  name!: string

  @Column({ default: false })
  isArchived!: boolean

  @Column()
  slug!: string

  @ManyToOne(target => User, user => user.boards, { nullable: false })
  user!: User

  @BeforeInsert()
  @BeforeUpdate()
  setSlug(): void {
    this.slug = slugify(this.name)
  }
}
