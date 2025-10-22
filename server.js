import express, { response } from 'express'
import taskRoutes from './src/routes/taskRoutes.js'
import { connectDB } from './src/config/db.js'
import dotenv from 'dotenv'
import cors from 'cors'

// Load from .env
dotenv.config()

// PORT
const PORT = process.env.PORT || 5001

// Create Express Application
const app = express()

// Middleware
app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }))

// Init routes
app.use('/api/tasks/', taskRoutes)

// Just start server when connect DB successfully
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log('server bắt đầu chạy trên cổng', PORT)
    })
})
