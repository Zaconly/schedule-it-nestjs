import { Module } from "@nestjs/common"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { TypeOrmModule } from "@nestjs/typeorm"

import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import databaseConfig from "./config/database.config"
import { UserModule } from "./users/user.module"
import { envValidationSchema } from "./utils/validations"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
      envFilePath: [".env.local", ".env"],
      validationSchema: envValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => configService.get("database"),
      inject: [ConfigService]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
