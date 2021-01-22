import { ValidationPipe } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"

import { AppModule } from "./app.module"
import { isProd } from "./utils/helpers"

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: !isProd })
  )

  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(configService.get("PORT"))
}

bootstrap()
