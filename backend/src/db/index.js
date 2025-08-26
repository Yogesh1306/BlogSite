import mongoose from "mongoose"
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log("MongoDB connected!! \nDB Host: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("DB connection Failed\nError: ",error);
    }
}

export {connectDB}