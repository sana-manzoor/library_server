const mongoose=require('mongoose')
const validators=require('validator')

const studSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        require:true,
        validate:[validators.isEmail,"Invalid Email"]
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        require:true,
        default:false
   
    }

})

const students=mongoose.model('students',studSchema)

module.exports=students
