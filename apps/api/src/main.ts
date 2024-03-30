declare const module: any

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)
  await app.listen(3000)
  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap().catch((error) => {
  console.error(error)
  process.exit(1)
})
