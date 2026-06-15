import { MongoClient } from 'mongodb'

export default function connectDB() {
    const db = process.env.MONGODB_URI
    console.log(db)
    return db
}