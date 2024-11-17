
const express = require('express'); 
const router = express.Router();

router.post('/', async (req, res) => {
    const { todoId, title, description, completed } = req.body;

    try {
        const newTodo = new Todo({
            todoId,
            title,
            description,
            completed
        });

        await newTodo.save();
        res.status(201).json({ message: 'TODO created successfully', todo: newTodo });
    } catch (error) {
        res.status(400).json({ message: 'Error creating TODO', error: error.message });
    }
});


router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TODOs', error: error.message });
    }
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        
        if (!todo) {
            return res.status(404).json({ message: 'TODO not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching TODO', error: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, description, completed },
            { new: true } 
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'TODO not found' });
        }

        res.status(200).json({ message: 'TODO updated successfully', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Error updating TODO', error: error.message });
    }
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'TODO not found' });
        }

        res.status(200).json({ message: 'TODO deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting TODO', error: error.message });
    }
});

module.exports = router;
