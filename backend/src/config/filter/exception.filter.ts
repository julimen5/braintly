import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as ExceptionFilter2,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JsonResponse } from './filter.type';
import { AnyObject } from '../../utils/object.util';
import {
  RegisterAlreadyExistsException,
  RegisterNotFound,
} from '../../repository/repository.exception';

@Catch()
export class ExceptionFilter implements ExceptionFilter2 {
  catch(exception: Error, host: ArgumentsHost): void {
    const httpContext = host.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const response = httpContext.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | AnyObject =
      exception.message ?? 'An error occurred on the server!';
    if (exception instanceof RegisterNotFound) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    }
    if (exception instanceof RegisterAlreadyExistsException) {
      status = HttpStatus.CONFLICT;
      message = exception.message;
    }
    // Http Error
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message =
        typeof exception.getResponse() === 'string'
          ? exception.getResponse()
          : (exception.getResponse() as AnyObject).message;
    }

    message =
      typeof message === 'string' ? message.replace(/\"/g, "'") : message;
    const shouldLog = status >= 400;
    const isServerError = status >= 500;

    if (shouldLog) {
      const title = 'Request failed';
      if (isServerError) {
        console.error(`${title} ${exception.stack}`, ExceptionFilter.name);
      } else {
        console.warn(
          `${title} (${exception.name}): ${exception.message}`,
          ExceptionFilter.name,
        );
      }
    }

    const json: JsonResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      method: request.method,
      path: request.url,
      message: Array.isArray(message) ? message : [message],
    };

    response.status(status).json(json);
  }
}
