import express, { response } from "express"
import taskRoutes from "./src/routes/taskRoutes.js"
import { connectDB } from "./src/config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"

// Load from .env
dotenv.config()

// PORT
const PORT = process.env.PORT || 5001
const __dirname = path.resolve()

// Create Express Application
const app = express()

// Middleware
app.use(express.json())

if (process.env.NODE_ENV !== "production") {
    app.use(cors({ origin: "http://localhost:5173" }))
}

// Init routes
app.use("/api/tasks/", taskRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

// Just start server when connect DB successfully
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server bắt đầu chạy trên cổng", PORT)
    })
})
