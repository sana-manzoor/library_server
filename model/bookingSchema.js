const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    bookid:{
        type:String,
        required:true,
        unique:true
    },
    studentid:{
        type:String,
        required:true,
        unique:true
    },
    bookingdate:{
        type:String,
        required:true
    },
    returndate:{
        type:String,
       
    },
    status:{
        type:String,
        required:true
    },
    bookname:{
        type:String
    }
    
    
})

const bookings=mongoose.model("bookings",bookingSchema)

module.exports=bookings