import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.BAD_REQUEST;

    const message = 'Validation Error';
    const exceptionResponse = exception.getResponse();

    if (typeof exceptionResponse === 'object') {
      if ('message' in exceptionResponse) {
        return response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          message,
          errors: exceptionResponse['message'],
        });
      }
    }

    return response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
      errors: exceptionResponse,
    });
  }
}
