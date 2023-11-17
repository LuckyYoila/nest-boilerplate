import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { errorResponse } from '../responses/app.response';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception?.statusCode || exception.status || 400;

    let custom_message = '';

    console.log(exception);

    // handling mongodb duplicate key error
    if (exception.code == '11000') {
      custom_message = `${Object.keys(exception.keyPattern)} already exists`;
    }

    return response
      .status(status)
      .json(errorResponse(custom_message ? custom_message : exception.message));
  }
}
