import { EntityRepository, Repository } from "typeorm"

import { ResetToken } from "./reset-token.entity"

@EntityRepository(ResetToken)
export class ResetTokenRepository extends Repository<ResetToken> {}
