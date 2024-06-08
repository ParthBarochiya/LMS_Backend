import mongoose from "mongoose";
require('dotenv').config()

const dbURL: string = process.env.DB_URL || ''

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL).then((data: any) => {
            console.log("database connected");
        })
    } catch (error: any) {
        console.log(error.message);
    }
}

export default connectDB