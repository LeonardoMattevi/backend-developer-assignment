
export default class HttpError extends Error {
    statusCode: number = 500
    stack: string = ''
    constructor(message: string, statusCode: number, stack: string = '') {
        super(message)
        this.statusCode = statusCode;
        this.stack = stack;
    }
}