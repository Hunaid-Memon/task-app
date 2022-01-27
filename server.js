const express = require('express');
const connectDB = require('./config/db');
const path = require('path')

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req,res) => res.json({ msg: "Welcome to Task App" }));

// Define Routes Here
app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/users', require('./routes/users'));

// Server static files on production server
if(process.env.NODE_ENV === 'production') {
    // Set Static Folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log(`server started on port ${PORT}`));