import { Module } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModule } from "@nestjs/jwt"
import { PassportModule } from "@nestjs/passport"

import { UserModule } from "../users/user.module"
import { AuthResolver } from "./auth.resolver"
import { AuthService } from "./auth.service"
import { JwtStrategy } from "./auth.strategy"

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get("ACCESS_TOKEN_SECRET"),
        signOptions: { expiresIn: "60s" }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
