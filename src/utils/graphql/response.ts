import { Field, ObjectType } from "@nestjs/graphql"

import { User } from "../../users/user.entity"

@ObjectType()
export class AuthResponse {
  @Field()
  token: string

  @Field()
  user: User
}

@ObjectType()
export class Response {
  @Field({ defaultValue: true })
  success?: boolean

  @Field()
  message: string

  @Field()
  key: string
}
