import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { join } from "path"

import { BoardModule } from "./boards/board.module"
import databaseConfig from "./config/database.config"
import { UserModule } from "./users/user.module"
import { isProd } from "./utils/helpers"
import { envValidationSchema } from "./utils/validations"
import { AuthModule } from "./auth/auth.module"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
      envFilePath: [".env.local", ".env"],
      validationSchema: envValidationSchema
    }),
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), "src/schema.gql"),
        sortSchema: true,
        debug: configService.get("DEBUG"),
        playground: !isProd,
        path: "/gql"
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.get("database"),
      inject: [ConfigService]
    }),
    UserModule,
    BoardModule,
    AuthModule
  ]
})
export class AppModule {}
