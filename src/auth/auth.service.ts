import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"

import { AuthResponse } from "../utils/graphql/response"
import { UserService } from "../users/user.service"
import { LoginArgs, RegisterInput } from "./auth.type"
import { User } from "../users/user.entity"
import { ResetTokenService } from "../reset-tokens/reset-token.service"
import { ServerException } from "../utils/exceptions"

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly resetTokenService: ResetTokenService
  ) {}

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

  async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync({ username: user.username, sub: user.id })
  }

  async login(args: LoginArgs): Promise<AuthResponse> {
    const user = await this.validateUser(args.identifier, args.password)

    if (!user) {
      throw new HttpException("Invalid login", HttpStatus.UNAUTHORIZED)
    }

    return {
      token: await this.generateAccessToken(user),
      user
    }
  }

  async register(input: RegisterInput): Promise<AuthResponse> {
    const user = await this.userService.create(input)

    return {
      token: await this.generateAccessToken(user),
      user
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await this.userService.findOne({ where: { email } })

      if (user) {
        await this.resetTokenService.forgotPassword(user)
      }
    } catch (e) {
      throw new ServerException(e)
    }
  }

  async resetPassword(encodedToken: string, newPassword: string): Promise<void> {
    try {
      const record = await this.resetTokenService.resetPassword(decodeURIComponent(encodedToken))

      await User.changePassword(newPassword, { email: record.email })
    } catch (e) {
      throw new ServerException(e)
    }
  }

  async changePassword(currentPassword: string, newPassword: string, id: string) {
    const user = await this.userService.findOne({ where: { id } })
    if (!user) {
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
    }

    if (currentPassword === newPassword) {
      throw new HttpException(
        "New password must be different than current password.",
        HttpStatus.BAD_REQUEST
      )
    }

    const isValid = await user.comparePassword(currentPassword)
    if (!isValid) {
      throw new HttpException("Your current password is invalid", HttpStatus.BAD_REQUEST)
    }

    try {
      await User.changePassword(newPassword, { id })
    } catch (e) {
      throw new ServerException(e)
    }
  }
}
