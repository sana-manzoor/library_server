const mongoose=require('mongoose')

const connectString=process.env.DATABASE

mongoose.connect(connectString).then(()=>{
    console.log("mongodb connected")
}).catch(rej=>{
    console.log("mongodb connection failed")
})

