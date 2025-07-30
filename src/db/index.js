import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log("\n MongoDB connected successfully!!! DB Host: ${connectionInstance.connection.host} \n");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;
