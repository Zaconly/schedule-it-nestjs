import { IsEmail } from "class-validator"
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("reset-tokens")
export class ResetToken extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @IsEmail()
  @Column()
  email: string

  @Column()
  token: string

  @Column()
  expirationDate: Date

  @Column({ default: false })
  isUsed: boolean
}
