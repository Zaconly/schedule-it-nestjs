import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { BoardModule } from "../boards/board.module"
import { UserController } from "./user.controller"
import { User } from "./user.entity"
import { UserRepository } from "./user.repository"
import { UserResolver } from "./user.resolver"
import { UserService } from "./user.service"

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository]), BoardModule],
  providers: [UserService, UserResolver],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
