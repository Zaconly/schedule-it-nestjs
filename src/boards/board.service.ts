import { Injectable } from "@nestjs/common"
import { BaseService } from "src/utils/service/BaseService"
import { Board } from "./board.entity"

import { BoardRepository } from "./board.repository"

@Injectable()
export class BoardService extends BaseService<Board> {
  constructor(protected readonly boardRepository: BoardRepository) {
    super(boardRepository)
  }
}
