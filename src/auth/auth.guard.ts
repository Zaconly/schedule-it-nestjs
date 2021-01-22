import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { GqlExecutionContext } from "@nestjs/graphql"
import { JwtService } from "@nestjs/jwt"

import { IMe } from "../types/context.type"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext()

    if (!ctx.headers.authorization) {
      return false
    }

    ctx.user = await this.validateToken(ctx.headers.authorization)
    return true
  }

  async validateToken(bearerToken: string): Promise<IMe> {
    const [bearer, token] = bearerToken.split(" ")

    if (bearer !== "Bearer") {
      throw new HttpException("Invalid token", HttpStatus.UNAUTHORIZED)
    }

    try {
      const decoded = await this.jwtService.verifyAsync(
        token,
        this.configService.get("ACCESS_TOKEN_SECRET")
      )

      return decoded
    } catch (err) {
      const message = "Token error: " + (err.message || err.name)
      throw new HttpException(message, HttpStatus.UNAUTHORIZED)
    }
  }
}
