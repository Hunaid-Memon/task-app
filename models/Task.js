const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    relationship: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('task', TaskSchema)