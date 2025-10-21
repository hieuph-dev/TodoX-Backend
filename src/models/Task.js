import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['active', 'completed'],
            default: 'active',
        },
        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

const Task = mongoose.model('Task', taskSchema) // Từ taskSchema -> sinh ra model Task
// Sau đó dùng model này để thao tác với dữ liệu
export default Task
