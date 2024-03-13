import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import mongoose from 'mongoose';
import studentModel from './models/student.model.js';
const app =express()
const port = process.env.PORT || 3010
const dbconnection = process.env.MONGODB_URI

app.use(express.json())
app.post('/',async(req,res)=>{
    try{
        const addedStudent = await studentModel.create(req.body)
        res.status(201).json({
            message:"student added",
            student:addedStudent
        });
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Error adding student"})

    }
  
})
app.get('/student/list',async(req,res)=>{
    try{
        const allStudent= await studentModel.find();
        res.status(201).json({
            message:"all student",
            student:allStudent
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Error adding student"})

    }
})

// app.post("/student/add",(req,res)=>{
//     studentModel.create(req.body)
//     .then((res)=>{
//         console.log(res.data)
//         res.status(201).json({
//             message:"student added",
//             student:addedStudent
//         })
//    })
// //    .catch(err){
// //     console.log(err.message)
// //     res.status(500).json({message:"Error adding student"})

// // }
    
// })
mongoose.connect(dbconnection)
.then(()=>{
    console.log("connected to DB ...");
    app.listen(port,()=>{
        console.log(`server is running on port ${port}...`)
    })
})
.catch((err)=>{
    console.log(err);
})


