const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const app = express();


app.use(express.json());


const url = 'mongodb+srv://3rrrkp:rohan123@cluster0.pe3ei.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
});


app.get('/', (req, res) => {
    res.send('Hello, MongoDB is connected!');
});

app.use('todos',todoRoutes)

app.listen(3000, () => {
    console.log("Your server is running on port 3000");
});
