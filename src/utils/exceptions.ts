import { HttpException, HttpStatus } from "@nestjs/common"

export class ServerException extends HttpException {
  constructor(error: Error) {
    super(error.message || "Internal Server Error", HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
