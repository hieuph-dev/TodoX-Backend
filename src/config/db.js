import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

        console.log('Connected')
    } catch (error) {
        console.error('Cannot connect with db: ', error)
        process.exit(1) // exit with error
    }
}
