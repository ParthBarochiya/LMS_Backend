import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDB from "./utils/db";
import ErrorMiddleware from "./middleware/error";

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())
app.use(cors())


connectDB()
// test API
app.get('/test', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    })
})

// unknown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        error: "API not found"
    })
})

app.use(ErrorMiddleware)

export default app