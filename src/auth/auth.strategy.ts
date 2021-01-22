import { ExtractJwt, Strategy } from "passport-jwt"
import { PassportStrategy } from "@nestjs/passport"
import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"

import { IJwtPayload } from "../types/context.type"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("ACCESS_TOKEN_SECRET")
    })
  }

  async validate(payload: IJwtPayload) {
    return { id: payload.sub, username: payload.username }
  }
}
