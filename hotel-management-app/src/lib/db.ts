import mongoose  from "mongoose";

const mongoUrl = process.env.DB_URL;

if (!mongoUrl) {
    throw new Error ("Environment variable DB_URL is not set");
}

const connectDB = async (): Promise<typeof mongoose> => {
    try {
        if (mongoose.connection.readyState >= 1) return mongoose;
        await mongoose.connect(mongoUrl);
        return mongoose;
    } catch (err) {
        console.error("Failed to connect to the database", err);
        throw err;
    }
};

export default connectDB;
