import { NestFactory } from "@nestjs/core"
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify"

import { AppModule } from "./app.module"
import { isProd } from "./utils/helpers"

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: !isProd })
  )
  await app.listen(3000)
}

bootstrap()
