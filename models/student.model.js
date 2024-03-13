import mongoose  from 'mongoose'
const StudentSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },  
    phone:{
        type:String,
        required:true,
        unique:true
    },  
    nationalId:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true,
        // enum:{
        //     value:['Male','Female'],
        //     message:'Gender must be either Female or Male'
        // }
    }
},{timestamps:true});
const studentModel = mongoose.model('student',StudentSchema)
export default studentModel;