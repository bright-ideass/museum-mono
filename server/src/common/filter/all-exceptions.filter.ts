import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as fs from 'fs';
import { add, format } from 'date-fns'

export interface HttpExceptionResponse {
    statusCode: number;
    error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
    path: string;
    method: string;
    timeStamp: string;
    message: string;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();

        let status: HttpStatus;
        let errorMessage: string;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            errorMessage =
                (errorResponse as HttpExceptionResponse).error || exception.message;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = 'Critical internal server error occurred!';
        }

        const errorResponse = this.getErrorResponse(status, errorMessage, request, exception.message);
        const errorLog = this.getErrorLog(errorResponse, request, exception);
        console.error('AllExceptionsFilter Errors:', errorResponse)
        this.writeErrorLogToFile(errorLog);
        response.status(status).json(errorResponse);

    }

    private getErrorResponse = (
        status: HttpStatus,
        errorMessage: string,
        request: Request,
        message: string,
    ): CustomHttpExceptionResponse => ({
        statusCode: status,
        error: errorMessage,
        path: request.url,
        method: request.method,
        timeStamp: new Date().toLocaleString('zh-Tw', { hour12: false }),
        message: message,
    });

    private getErrorLog = (
        errorResponse: CustomHttpExceptionResponse,
        request: Request,
        exception: unknown,
    ): string => {
        const { statusCode, error } = errorResponse;
        const { method, url } = request;
        const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n
      ${JSON.stringify(errorResponse)}\n
      User: ${JSON.stringify(request['user'] ?? 'Not signed in')}\n
      ${exception instanceof HttpException ? exception.stack : error}\n
      ip: ${request.headers['x-forwarded-for'] || request.socket.remoteAddress || null}\n
      end===========================================================================\n\n`;
        return errorLog;
    };

    private writeErrorLogToFile = (errorLog: string): void => {
        if (!fs.existsSync(process.env.LOG_FILE)) {
            fs.mkdirSync(process.env.LOG_FILE);
        }
        fs.appendFile(`${process.env.LOG_FILE}/${format(new Date(), 'yyyy-MM-dd')}-error.log`, errorLog, 'utf8', (err) => {
            if (err) throw err;
        });
    };
}