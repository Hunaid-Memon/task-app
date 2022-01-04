const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'Pending'
    },
    setDate: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('task', TaskSchema)