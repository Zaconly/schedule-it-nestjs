import { registerAs } from "@nestjs/config"
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

import { isProd } from "../utils/helpers"

export default registerAs(
  "database",
  (): MysqlConnectionOptions => ({
    type: process.env.DB_TYPE as "mysql" | "mariadb",
    host: process.env.DB_HOST as string,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    entities: [],
    synchronize: !isProd,
    //dropSchema: !isProd
    debug: (process.env.DEBUG as unknown) as boolean
  })
)
