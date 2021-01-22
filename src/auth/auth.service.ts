import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { AuthResponse } from "../utils/graphql/response"
import { UserService } from "../users/user.service"
import { LoginArgs } from "../users/user.args"
import { User } from "../users/user.entity"

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(identifier: string, password: string): Promise<User> {
    const user = await this.userService.findByIdentifier(identifier)

    if (!user) {
      return null
    }

    const isValid = await user.comparePassword(password)

    if (isValid) {
      return user
    }

    return null
  }

  async login(args: LoginArgs): Promise<AuthResponse> {
    const user = await this.validateUser(args.identifier, args.password)

    if (!user) {
      throw new HttpException("Invalid login", HttpStatus.UNAUTHORIZED)
    }

    return {
      token: this.jwtService.sign({ username: user.username, sub: user.id }),
      user
    }
  }
}
