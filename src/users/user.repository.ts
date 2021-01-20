import { EntityRepository, Repository } from "typeorm"

import { User } from "./user.entity"

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByIdentifier(identifier: string): Promise<User | null> {
    const user = await this.findOne({ where: [{ email: identifier }, { username: identifier }] })
    return user
  }
}
