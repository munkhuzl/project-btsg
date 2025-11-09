import  mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDb=async()=>{
    try {
        const uri=process.env.MONGO_URI;
        if(!uri) {
            console.log("Mongo_Uri is not defined")
            return;
        }
        await mongoose.connect(uri);
        console.log('Connected');
    } catch (error) {
        console.error('Failed to connect database', error);
        process.exit(1);
    }
}