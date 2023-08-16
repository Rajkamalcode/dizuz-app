import mongoose from 'mongoose';

let isConnected = false; // to check the MongoDB connection

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        return console.log('MONGODB URL NOT FOUND');
    }
    
    if (isConnected) {
        return console.log('MONGODB already connected');
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Failed to connect to MongoDB:', error);
    }
}
