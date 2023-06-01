import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      console.log(exception.message);
      switch (exception.getStatus()) {
        case 401:
        case 403:
        case 404:
          response.status(302).redirect('/page-not-found');
          return;
      }
  
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
  
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
  