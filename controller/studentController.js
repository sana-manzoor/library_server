const students = require('../model/studentSchema')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    console.log("Inside Register Function")
    const { name,gender,age,email,address,phone,password } = req.body
    console.log(`name:${name},gender:${gender},age:${age}Address:${address},Email:${email},Password:${password},phone:${phone}`)
    try {
        const excistingUser = await students.findOne({ email })
        console.log(excistingUser)
        if (excistingUser) {
            res.status(406).json("Excisting User..Please Try again!!")
        }
        else {
            const newUser = new students({name,gender,age,address,email,password,phone  })
            await newUser.save()
            res.status(200).json(newUser)

        }

    }
    catch (err) {
        res.status(401).json("Something Went Wrong," + err)
    }

}


exports.login = async (req, res) => {
    console.log("inside login function!")
    const { email, password} = req.body

    try {
        const excistingUser = await students.findOne({ email, password})
        if (excistingUser && excistingUser.isAdmin==true) {
         
            const token = jwt.sign({ userId: excistingUser._id }, "secretid")
            console.log(excistingUser)
            res.status(200).json({
                excistingUser,
                role: "admin",
                token
            })


        }
        else if(excistingUser){
            const token = jwt.sign({ userId: excistingUser._id }, "secretid")
            console.log(excistingUser)
            res.status(200).json({
                excistingUser,
                role: "user",
                token
            })
        }
       
        else {
            res.status(406).json("Invalid Email/Password!!")
        }
    }
    catch (err) {
        res.status(500).json("Something Went Wrong!!" + err)
    }
}






exports.studentslist = async (req, res) => {
    console.log("Inside studentslist")
    // res.send("userslist")
    console.log(req.payload)
    try {
        const data = await students.find({ isAdmin :false})
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }

 exports.studentdel = async (req, res) => {
    console.log("Inside studentdelete")
    // res.send("userslist")
    const {id}=req.params
    try {
        const data = await students.findByIdAndDelete({_id:id})
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }


 exports.getUser = async (req, res) => {
    // const userId=req.payload
    console.log("inside get student")
   
    const {id}=req.params
    try{
      console.log("inside gett")
      const result=await students.findById({_id:id})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  //   res.send(`${title},${overview},${uploadedFile},${id}`)
  }

  
 exports.editStudent = async (req, res) => {
    const {name,gender,age,email,address,phone,password }=req.body
    console.log(req.body)
    const uploadedFile=req.file?req.file.filename:req.body.profile
    const {id}=req.params
    try{
      console.log("inside edit")
      const result=await students.findByIdAndUpdate({_id:id},{name,gender,age,email,address,phone,password,profile:uploadedFile})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
        console.log(err)
      res.status(401).json(err)
    }
    //  res.send(`${title},${price},${uploadedFile},${id}`)
  }

  exports.getEm = async (req, res) => {
    // const userId=req.payload
    console.log("inside get email")
    const {email}=req.body
    try{
      const result=await students.findOne({email})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  //   res.send(`${title},${overview},${uploadedFile},${id}`)
  }

  exports.changepass = async (req, res) => {
    // const userId=req.payload
    console.log("inside changepassword")
    const {id}=req.params
   
    const {password}=req.body
    try{
      const result=await students.findOneAndUpdate({_id:id},{password})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
      console.log(err)
      res.status(401).json(err)
    }
  //   res.send(`${title},${overview},${uploadedFile},${id}`)
  }
