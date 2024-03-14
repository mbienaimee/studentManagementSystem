import dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import mongoose from 'mongoose';
import studentModel from './models/student.model.js';
import facilitatorModel from './models/facilitator.model.js';

const app =express()
// app.use(facilitatorModel)
const port = process.env.PORT || 3010
const dbconnection = process.env.MONGODB_URI

app.use(express.json())
app.post('/student',async(req,res)=>{
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
app.post('/facilitator',async(req,res)=>{
    try{
        const addedfacilitator = await facilitatorModel.create(req.body)
        res.status(201).json({
            message:"facilitator added",
            facilitator:addedfacilitator
        });
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Error adding facilitator"})

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
app.get('/facilitator/list',async(req,res)=>{
    try{
        const allfacilitator= await facilitatorModel.find();
        res.status(201).json({
            message:"all facilitator",
            student:allfacilitator
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Error adding student"})

    }
})
app.get('/student/list/:id',async(req,res)=>{
    try{
        const StudentbyId= await studentModel.findById(req.params.id);
        res.status(201).json({
            message:"student",
            student:StudentbyId
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"not found"})

    }
})
app.get('/facilitator/list/:id',async(req,res)=>{
    try{
        const facilitatorbyId= await facilitatorModel.findById(req.params.id);
        res.status(201).json({
            message:"facilitator",
            facilitator:facilitatorbyId
        })

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"not found"})

    }
})



app.delete('/student/delete/:id', async (req, res) => {
    try {

        const deleteById = await studentModel.deleteOne({ _id: req.params.id });
        if (deleteById) {
            res.status(201).json({
                message: "student deleted successfuly"

            });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});
app.delete('/facilitator/delete/:id', async (req, res) => {
    try {

        const deleteById = await facilitatorModel.deleteOne({ _id: req.params.id });
        if (deleteById) {
            res.status(201).json({
                message: "student deleted successfuly"

            });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});

//update


app.put('/student/update/:id', async (req, res) => {
    try {
        const updateList = await studentModel.findOneAndUpdate({_id:req.params.id},{
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            nationalId: req.body.nationalId,
            gender: req.body.gender
            
        },{new:true});
        res.status(201).json({
            student: updateList
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "internal server error"
        })
    }

});

app.put('/facilitator/update/:id', async (req, res) => {
    try {
        const updateList = await facilitatorModel.findOneAndUpdate({_id:req.params.id},{
            fullName: req.body.fullName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            nationalId: req.body.nationalId,
            course: req.body.course
            
        },{new:true});
        res.status(201).json({
            student: updateList
        })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).json({
            message: "internal server error"
        })
    }

});


//get by email

app.get('/student/getByEmail/:email', async (req, res) => {
    try {
        const findByEmail = await studentModel.findOne({email:req.params.email});

        if(!findByEmail){
            res.status(404).json({
                message:'student not found'
            })
        }
        res.status(201).json({
            message: "find student by email is ok",
            student: findByEmail
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});

app.get('/facilitator/getByEmail/:email', async (req, res) => {
    try {
        const findByEmail = await facilitatorModel.findOne({email:req.params.email});

        if(!findByEmail){
            res.status(404).json({
                message:'student not found'
            })
        }
        res.status(201).json({
            message: "find facilitator by email is ok",
            student: findByEmail
        })
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "internal server error"
        });
    }
});

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


