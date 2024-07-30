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
