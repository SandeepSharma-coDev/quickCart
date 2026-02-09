import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        }

        
const uri = process.env.MONGODB_URI.endsWith('/') 
            ? `${process.env.MONGODB_URI}quickcart` 
            : `${process.env.MONGODB_URI}/quickcart`;

cached.promise = mongoose.connect(uri, opts).then(mongoose => mongoose);

    }

     try {
        cached.conn = await cached.promise
    } catch (e) {
        cached.promise = null // Clear promise on error so we can retry
        throw e
    }
    return cached.conn
}

export default connectDB