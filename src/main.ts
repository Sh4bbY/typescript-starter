import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { environment } from './environments/environment';

if (environment.production) {
  console.log('app started in production mode');
} else {
  console.log('app started in development mode');
}

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(3000);
}
bootstrap();
