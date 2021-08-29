import {Request, Response, NextFunction}  from 'express'
import { createLogger, transports, format } from 'winston'
import HttpError from '../models/HttpError';


const transportErrors = [
  new transports.File({
    level: 'error',
    filename: 'logs/winston/mid-errors.log',
    maxsize: 30000000, // 30MB
    tailable: true,
    maxFiles: 3,
  }),
];
const loggerError = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss:ms' }),
    format.printf((err) => { return `${JSON.stringify(err)},`; }),
  ),
  transports: transportErrors,
});

export default function routesErrorsLogger(err: HttpError, req: Request, res: Response, next: NextFunction) {
    loggerError.error(err.message, {
        date: new Date().toLocaleString(),
        statusCode: err.statusCode || '500',
        url: req.url || '',
        stack: err.stack,
    });
    res.status(err.statusCode || 500).send(err.message || err);

    next(err);
}