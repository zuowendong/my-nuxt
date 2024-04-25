import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [/^http:\/\/localhost(:\d+)?$/],
  });
  await app.listen(3002);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
