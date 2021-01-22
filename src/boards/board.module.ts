import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"

import { BoardController } from "./board.controller"
import { Board } from "./board.entity"
import { BoardRepository } from "./board.repository"
import { BoardService } from "./board.service"

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardRepository])],
  providers: [BoardService],
  controllers: [BoardController],
  exports: [BoardService]
})
export class BoardModule {}
