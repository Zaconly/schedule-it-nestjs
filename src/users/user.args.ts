import { ArgsType, Field } from "@nestjs/graphql"
import { IsEmail, Length, MinLength } from "class-validator"

@ArgsType()
export class RegisterArgs {
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
