import { FastifyRequest } from "fastify"

import { User } from "../users/user.entity"

export interface IContext {
  me: IMe
  req: IRequest
}

export interface IMe {
  id: string
  username: string
}

export interface IRequest extends FastifyRequest {
  user: User
}

export interface IJwtPayload {
  sub: string
  username: string
}
