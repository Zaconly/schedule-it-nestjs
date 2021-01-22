import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { AuthService } from "./auth.service"
import { IMe } from "../types/context.type"
import { User } from "../users/user.entity"
import { UserService } from "../users/user.service"
import { Me } from "../utils/graphql/decorators"
import { AuthResponse } from "../utils/graphql/response"
import { LoginArgs } from "../users/user.args"
import { AuthGuard } from "./auth.guard"

@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Query(returns => User, { name: "me" })
  async getMe(@Me() me: IMe): Promise<User> {
    return this.userService.findOne({ where: { id: me.id } })
  }

  @Mutation(returns => AuthResponse)
  async login(@Args() args: LoginArgs): Promise<AuthResponse> {
    return this.authService.login(args)
  }
}
