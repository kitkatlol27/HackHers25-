const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 8080;
const dotenv = require('dotenv').config();

const app = express();
const connectDB = require('./config/db');

const Task = require('./model/getModel');
// Custom CORS middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Allow requests from your frontend
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // Specify allowed methods
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Specify allowed headers
    next();
});

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//GET TASKS 
app.get('/api/tasks', async (req, res) => {
    const tasks = await Task.find({}, {text: 1, _id: 0});
    const taskNames = tasks.map((task) => task.text);
    console.log(taskNames);
    res.send(taskNames);
})

//ADD TASK
app.post('/api/tasks', async(req, res)=>{
    const {text} = req.body;

    if(!text){
        return res.status(404).json({error: "Please write the task..."}); 
    }

    try{
         const new_task = await Task.create(req.body);
         res.send(new_task);
    } catch(error){
        res.status(500).json({error: error.message});
    }
   
})

//DELETE TASK 
app.delete('/api/tasks/:id', async(req, res)=>{
    const id = req.params.id;

    if(!id){
        return res.status(404).json({error: "Please write the task..."}); 
    }

    try{
        Task.delete();
        res.send(" ");
    } catch(error){
        res.status(500).json({error: error.message});
    }
   
})

//UPDATE TASK 
app.listen(port, ()=>{
    console.log(`Listening to ${port}. `);
})