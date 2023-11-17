import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';
export interface Response<T> {
  data: T;
}

//  transform the response
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // console.log(context.switchToHttp().getResponse());
    return next.handle().pipe(
      map((results) => {
        // result could be paginated or not
        let metadata = {};
        let data = null;
        if (results?.metadata) {
          metadata = results?.metadata;
          data = results?.data;
        } else {
          data = results;
        }

        return {
          status: true,
          message:
            this.reflector.get<string>(
              'response_message',
              context.getHandler(),
            ) || '',
          metadata,
          data,
          // context: context.switchToHttp().getResponse(),
        };
      }),
    );
  }
}
