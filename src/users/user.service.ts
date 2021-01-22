import { Injectable } from "@nestjs/common"

import { BaseService } from "../utils/service/BaseService"
import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService extends BaseService<User> {
  constructor(protected readonly userRepository: UserRepository) {
    super(userRepository)
  }

  async findByIdentifier(identifier: string): Promise<User> {
    return this.userRepository.findByIdentifier(identifier)
  }
}
