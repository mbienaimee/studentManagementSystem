import mongoose  from 'mongoose'
const facilitatorSchema = new mongoose.Schema({
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
    course:[{
        type:String,
        required:true
    }],
    Role:{
        type:String,
        required:true

    }
  
},{timestamps:true});
const facilitatorModel = mongoose.model('Facilitator',facilitatorSchema)
export default facilitatorModel;