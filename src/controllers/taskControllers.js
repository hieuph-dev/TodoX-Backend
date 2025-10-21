import Task from '../models/Task.js'

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 })
        res.status(200).json(tasks)
    } catch (error) {
        console.error('Error when call getAllTasks', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const createTask = async (req, res) => {
    try {
        const { title } = req.body
        const task = new Task({ title })

        const newTask = await task.save()
        res.status(200).json(newTask)
    } catch (error) {
        console.error('Error when call createTask', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt,
            },
            { new: true }
        )

        if (!updateTask) {
            return res.status(404).json({ message: 'Task not exists' })
        }

        res.status(200).json(updateTask)
    } catch (error) {
        console.error('Error when call updateTask', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id)

        if (!deleteTask) {
            return res.status(404).json({ message: 'Task not exists' })
        }

        res.status(200).json(deleteTask)
    } catch (error) {
        console.error('Error when call deleteTask', error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
