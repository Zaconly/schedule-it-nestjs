import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { ResetToken } from "./reset-token.entity"
import { ResetTokenRepository } from "./reset-token.repository"
import { ResetTokenService } from "./reset-token.service"

@Module({
  imports: [TypeOrmModule.forFeature([ResetToken, ResetTokenRepository])],
  providers: [ResetTokenService],
  exports: [ResetTokenService]
})
export class ResetTokenModule {}
