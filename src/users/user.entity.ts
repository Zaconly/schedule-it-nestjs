import { Field, ObjectType } from "@nestjs/graphql"
import bcrypt from "bcryptjs"
import { IsAlphanumeric, IsEmail, Length } from "class-validator"
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm"

import { Board } from "../boards/board.entity"
import { BaseContent } from "../utils/entity/BaseContent"
import { Roles } from "../types/user.type"

@ObjectType()
@Entity("users")
export class User extends BaseContent {
  @Field()
  @IsAlphanumeric()
  @Length(3, 30)
  @Column({ length: 30, unique: true })
  username: string

  @Field()
  @IsEmail()
  @Column({ length: 60, unique: true })
  email: string

  @Length(4, 60)
  @Column({ length: 60 })
  password: string

  @Column("set", { enum: Roles, default: [Roles.USER] })
  roles: Roles[]

  @Field()
  @Column({ default: true })
  isActive: boolean

  @Field()
  @Column({ default: false })
  isConfirmed: boolean

  @Field(type => [Board])
  @OneToMany(target => Board, board => board.user)
  boards: Board[]

  async hashPassword(): Promise<string> {
    return bcrypt.hash(this.password, 12)
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    this.password = await this.hashPassword()
  }
}
