import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)

        const connectionInstance = mongoose.connection

        connectionInstance.on('connected', () => {
            console.log("MongoDB connection successfull");
        })
        connectionInstance.on('error', (error) => {
            console.log("mongodb connection error:" + error);
            process.exit(1)
        })
    } catch (error) {
        console.log("mongodb connection error", error);
    }
}