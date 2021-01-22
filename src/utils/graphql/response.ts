import { Field, ObjectType } from "@nestjs/graphql"

import { User } from "../../users/user.entity"

@ObjectType()
export class AuthResponse {
  @Field()
  token: string

  @Field()
  user: User
}
