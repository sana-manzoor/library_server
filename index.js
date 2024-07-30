require('dotenv').config()

const express=require('express')

const cors=require('cors')

const libserver=express()

libserver.use(cors())

libserver.use(express.json())

const router=require('./Routes/routes')

require('./connection/dbconnection')

libserver.use(router)

//serving upload files
libserver.use('/upload',express.static('./uploads'))


const PORT=3000 || process.env.PORT


libserver.listen(PORT,()=>{
    console.log(`server is started at PORT${PORT}`)
})

libserver.get('/',(req,res)=>{
    res.send("<h1>Server running successfully</h1>")
})