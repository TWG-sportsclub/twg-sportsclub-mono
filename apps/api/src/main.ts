import { FlubErrorHandler } from 'nestjs-flub'
import * as SwaggerStats from 'swagger-stats'

import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Sportsclub API')
    .setDescription('Make Every Game Exciting!')
    .setVersion('1.0')
    .addTag('Sportsclub')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  app.use(SwaggerStats.getMiddleware({ swaggerSpec: document }))
  SwaggerModule.setup('api', app, document)

  app.useGlobalFilters(new FlubErrorHandler())
  await app.listen(3000)
}
bootstrap().catch((error) => {
  console.error(error)
  process.exit(1)
})
