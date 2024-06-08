import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";


function error(err: any, req: Request, res: Response, next: NextFunction) {
    err.statusCode = err.statusCode || 500
    err.message = err.message || "internal server error"

    // Wrong MongoDB ID Error
    if (err.name === 'CastError') {
        const message = "Resource not found"
        err = new ErrorHandler(message, 400)
    }

    // Duplicate key Error
    if (err.code === 11000) {
        const message = 'Duplicate Key Error'
        err = new ErrorHandler(message, 400)
    }

    if (err.name === 'jsonWebTokenError') {
        const message = "token is invalid"
        err = new ErrorHandler(message, 400)
    }

    if (err.name === 'TokenExpiredError') {
        const message = "token expired"
        err = new ErrorHandler(message, 400)
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    })
}

export default error