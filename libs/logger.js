import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new DailyRotateFile({
            filename: 'logs/%DATE%.log',
            maxSize: '20m',
            maxFiles: '30d',
            zippedArchive: true,
        })
    ]
});

export default logger