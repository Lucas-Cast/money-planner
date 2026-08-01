import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  const allowedOrigins = configService
    .getOrThrow<string>('ALLOWED_ORIGINS')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  })

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Personal Finance API')
    .setDescription('API for goals and allocations')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('docs', app, document)

  const port = configService.get('PORT') ?? 3000
  await app.listen(port, '0.0.0.0')

  console.log(`API running on http://localhost:${port}`)
  console.log(`Swagger docs: http://localhost:${port}/docs`)
}
bootstrap()
