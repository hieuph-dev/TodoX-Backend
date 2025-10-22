import Task from '../models/Task.js'

export const getAllTasks = async (req, res) => {
    try {
        const result = await Task.aggregate([
            {
                $facet: {
                    tasks: [{ $sort: { createdAt: -1 } }],
                    activeCount: [
                        { $match: { status: 'active' } },
                        { $count: 'count' },
                    ],
                    completedCount: [
                        { $match: { status: 'completed' } },
                        { $count: 'count' },
                    ],
                },
            },
        ])

        const tasks = result[0].tasks
        const activeCount = result[0].activeCount[0]?.count || 0
        const completedCount = result[0].completedCount[0]?.count || 0

        res.status(200).json({ tasks, activeCount, completedCount })
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
