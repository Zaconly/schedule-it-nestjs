import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql"
import { Board } from "src/boards/board.entity"
import { BoardService } from "src/boards/board.service"
import { RegisterArgs } from "./user.args"

import { User } from "./user.entity"
import { UserService } from "./user.service"

@Resolver(of => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly boardService: BoardService
  ) {}

  @Query(returns => User, { name: "user" })
  async getUser(@Args("id") id: string): Promise<User> {
    return this.userService.findOne({ where: { id } })
  }

  @Mutation(returns => User)
  async addUser(@Args() args: RegisterArgs): Promise<User> {
    const newUser = await this.userService.create(args)
    return newUser
  }

  @ResolveField("boards", returns => [Board])
  async boards(@Parent() user: User): Promise<Board[]> {
    return this.boardService.find({ where: { user } })
  }
}
