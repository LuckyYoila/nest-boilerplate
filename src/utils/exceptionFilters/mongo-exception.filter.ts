import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { errorResponse } from '../responses/app.response';
import { MongoServerError } from 'mongodb';

// doesn't catch any errors
@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = 400;

    console.log(exception);
    return response.status(status).json(errorResponse(exception.message));
  }
}
