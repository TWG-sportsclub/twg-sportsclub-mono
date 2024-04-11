import { FlubErrorHandler } from 'nestjs-flub'
import * as SwaggerStats from 'swagger-stats'

import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)
  const port = process.env.API_PORT || 3000

  const config = new DocumentBuilder()
    .setTitle('Sportsclub API')
    .setDescription('Make Every Game Exciting!')
    .setVersion('1.0')
    .addTag('Sportsclub')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  app.use(SwaggerStats.getMiddleware({ swaggerSpec: document }))

  app.useGlobalFilters(new FlubErrorHandler({ theme: 'dark', quote: true }))
  await app.listen(port, () => {
    Logger.log(`API Listening at http://localhost:${port}/${globalPrefix}`)
  })
}
bootstrap().catch((error) => {
  console.error(error)
  process.exit(1)
})
