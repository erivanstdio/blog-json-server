import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';

@Catch(SyntaxError)
export class JsonParseExceptionFilter implements ExceptionFilter {
  catch(exception: SyntaxError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const message = exception.message.includes('Unexpected token }')
      ? 'Erro de formatação no JSON: remova a vírgula após o último campo. Exemplo inválido: { "email": "exemplo@email.com", }'
      : 'JSON mal formatado. Verifique a estrutura do seu body.';

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      error: 'Bad Request',
      message,
    });
  }
}
