import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { errorResponse } from '../responses/app.response';
import AppError from '../error/app.error';

@Catch(AppError)
export class ServerExceptionFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.statusCode || 400;

    console.log(exception);
    return response.status(status).json(errorResponse(exception.message));
  }
}
