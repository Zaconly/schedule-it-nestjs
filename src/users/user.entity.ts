import bcrypt from "bcryptjs"
import { IsAlphanumeric, IsEmail, Length } from "class-validator"
import { Board } from "src/boards/board.entity"
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm"

import { BaseContent } from "../utils/entity/BaseContent"
import { Roles } from "../utils/types/user.type"

@Entity("users")
export class User extends BaseContent {
  @IsAlphanumeric()
  @Length(3, 30)
  @Column({ length: 30, unique: true })
  username: string

  @IsEmail()
  @Column({ length: 60 })
  email: string

  @Length(4, 60)
  @Column({ length: 60 })
  password: string

  @Column("set", { enum: Roles, default: [Roles.USER] })
  roles: Roles[]

  @Column({ default: true })
  isActive: boolean

  @Column({ default: false })
  isConfirmed!: boolean

  @OneToMany(target => Board, board => board.user)
  boards!: Board[]

  async hashPassword(): Promise<string> {
    const password = await bcrypt.hash(this.password, 12)
    return password
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    this.password = await this.hashPassword()
  }
}
