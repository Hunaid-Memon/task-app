const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../middleware/auth');

const User = require('../models/User');
const Task = require('../models/Task');

// @route   GET api/tasks
// @desc    Get all the user's task
// @access  Private
router.get('/', auth ,async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).sort({
            date: -1
        })
        res.json(tasks)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/tasks
// @desc    Add a new task
// @access  Private
router.post('/', [auth, [
    check('name', 'Name is required').not().isEmpty()
] ] , async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, relationship } = req.body;

    try {
        const newTask = new Task({
            name,
            email,
            phone,
            relationship,
            user: req.user.id
        })

        const task = await newTask.save();

        res.json(task);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error')
    }
});

// @route   PUT api/tasks:id
// @desc    Update a task
// @access  Private
router.put('/:id', auth , async (req,res) => {
    
    const { name, email, phone, relationship } = req.body;

    const taskFields = { };

    if(name) taskFields.name = name;
    if(email) taskFields.email = email;
    if(phone) taskFields.phone = phone;
    if(relationship) taskFields.relationship = relationship;

    try {
        let task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({ msg: 'This task does not exist.' });

        if(task.user.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'You do not have the correct authorization to update this contact' });
        }

        task = await Task.findByIdAndUpdate(req.params.id,
            { $set: taskFields },
            { new: true }
            );
            
            res.json(task)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/tasks:id
// @desc    Delete the task
// @access  Private
router.delete('/:id', auth, async (req,res) => {
    try {
        let task = await Task.findById(req.params.id);

        if(!task) return res.status(404).json({ msg: 'This task does not exist.' });

        if(task.user.toString() !== req.user.id ) {
            return res.status(401).json({ msg: 'You do not have the correct authorization to update this contact' });
        }
 
        await Task.findByIdAndRemove(req.params.id);

        res.json({ msg: 'This contact has been removed' })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
