import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import crypto from "crypto"

import { Response } from "../utils/graphql/response"
import { UserService } from "../users/user.service"
import { BaseService } from "../utils/service/BaseService"
import { ResetToken } from "./reset-token.entity"
import { ResetTokenRepository } from "./reset-token.repository"
import { User } from "../users/user.entity"
import { MoreThan } from "typeorm"

@Injectable()
export class ResetTokenService extends BaseService<ResetToken> {
  constructor(
    protected readonly resetTokenRepository: ResetTokenRepository,
    private readonly userService: UserService
  ) {
    super(resetTokenRepository)
  }

  async forgotPassword({ email }: User): Promise<void> {
    await this.update({ isUsed: true }, { where: { email } })

    const token = crypto.randomBytes(32).toString("base64")

    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + 1 / 24)

    this.create({ email, expirationDate, token })
  }

  async resetPassword(token: string): Promise<ResetToken> {
    const record = await this.findOne({
      where: {
        expirationDate: MoreThan("CURDATE"),
        token,
        isUsed: false
      }
    })

    if (!record) {
      throw new HttpException(
        "Reset token is invalid or expired, please request a new one.",
        HttpStatus.BAD_REQUEST
      )
    }

    await this.update({ isUsed: true }, { where: { token } })

    return record
  }
}
