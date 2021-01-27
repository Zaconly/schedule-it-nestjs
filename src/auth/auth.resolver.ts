import { UseGuards } from "@nestjs/common"
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql"

import { AuthService } from "./auth.service"
import { IMe } from "../types/context.type"
import { User } from "../users/user.entity"
import { UserService } from "../users/user.service"
import { Me } from "../utils/graphql/decorators"
import { AuthResponse, Response } from "../utils/graphql/response"
import { ChangePasswordArgs, LoginArgs, RegisterInput, ResetPasswordArgs } from "./auth.type"
import { GqlAuthGuard } from "./auth.guard"

@Resolver(of => User)
export class AuthResolver {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(GqlAuthGuard)
  @Query(returns => User, { name: "me" })
  async getMe(@Me() me: IMe): Promise<User> {
    return this.userService.findOne({ where: { id: me.id } })
  }

  @Mutation(returns => AuthResponse)
  async login(@Args() args: LoginArgs): Promise<AuthResponse> {
    return this.authService.login(args)
  }

  @Mutation(returns => AuthResponse)
  async register(@Args() input: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(input)
  }

  @Mutation(returns => Response)
  async forgotPassword(@Args() email: string): Promise<Response> {
    this.authService.forgotPassword(email)

    return {
      message: "An email has been sent to the address provided if the account exist.",
      key: "FORGOT_PASSWORD_MESSAGE"
    }
  }

  @Mutation(returns => Response)
  async resetPassword(@Args() input: ResetPasswordArgs): Promise<Response> {
    this.authService.resetPassword(input.token, input.newPassword)

    return {
      message: "Your password has been reset. Please login using your new password",
      key: "RESET_PASSWORD_MESSAGE"
    }
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Response)
  async changePassword(@Args() input: ChangePasswordArgs, @Me() { id }: IMe): Promise<Response> {
    this.authService.changePassword(input.currentPassword, input.newPassword, id)

    return {
      message: "Your password has been updated.",
      key: "CHANGE_PASSWORD_MESSAGE"
    }
  }
}
