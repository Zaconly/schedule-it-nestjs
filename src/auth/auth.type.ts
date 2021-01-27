import { ArgsType, Field, InputType } from "@nestjs/graphql"
import { IsEmail, Length, MinLength } from "class-validator"

@InputType()
export class RegisterInput {
  @Field()
  @Length(3, 30)
  username: string

  @Field()
  @IsEmail()
  email: string

  @Field()
  @Length(4, 60)
  password: string
}

@ArgsType()
export class LoginArgs {
  @Field()
  @MinLength(3)
  identifier: string

  @Field()
  password: string
}

@ArgsType()
export class ResetPasswordArgs {
  @Field()
  token: string

  @Field()
  @Length(4, 60)
  newPassword: string
}

@ArgsType()
export class ChangePasswordArgs {
  @Field()
  currentPassword: string

  @Field()
  @Length(4, 60)
  newPassword: string
}
