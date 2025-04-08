import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { JsonParseExceptionFilter } from './common/filters/json-parse-exception.filter';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
   // Middleware para capturar erros de JSON malformado
   app.use(
    json({
      verify: (req, res, buf, encoding) => {
        try {
          JSON.parse(buf.toString(encoding as BufferEncoding | undefined));
        } catch (e) {
          (e as any).body = buf;
          throw new SyntaxError('Invalid JSON');
        }
      },
    })
  );

  // Redefinir tratador de erro para SyntaxError
  app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message:
          'JSON mal formatado. Verifique se não há vírgulas extras, aspas faltando ou chaves desbalanceadas.',
      });
    }

    next(); // delega pro Nest se não for JSON inválido
  });

  app.useGlobalFilters(new JsonParseExceptionFilter());
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
