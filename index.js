require('dotenv').configDotenv()
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todos');
const app = express();


app.use(express.json());


const url = process.env.MONGO_URL;


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
