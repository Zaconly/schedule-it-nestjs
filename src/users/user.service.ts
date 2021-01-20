import { Injectable } from "@nestjs/common"

import { User } from "./user.entity"
import { UserRepository } from "./user.repository"

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByIdentifier(identifier: string): Promise<User> {
    return this.userRepository.findByIdentifier(identifier)
  }
}
