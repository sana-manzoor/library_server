const bookings = require('../model/bookingSchema')
const books = require('../model/bookSchema')

exports.addbooking = async (req, res) => {
    console.log("Inside booking Function")
    console.log(req.body)
    const { bookid, studentid, bookingdate, bookname } = req.body

    try {
        const excistingUser = await bookings.findOne({ bookid, studentid })
        console.log(excistingUser)
        // excistaingProduct.quantity--
        // if(excistingProduct.quantity==0){
        //     const result=await carts.findOneAndDelete({_id:cartId})
        //     res.status(200).json("Item Deleted by Quantity 0")
        // }
        if (excistingUser) {
            res.status(400).json("Excisting book..Please Try again!!")
        }
        else {
            const newBook = new bookings({ bookid, studentid, bookingdate, returndate: "", status: "pending",bookname })
            await newBook.save()
            res.status(200).json(newBook)

        }

    }
    catch (err) {
        res.status(401).json("Something Went Wrong," + err)
    }

}

exports.decrNumber = async (req, res) => {
    console.log("Inside decrease Function")

    try {
        const bookId = req.params.id
        const excistingBook = await books.findOne({ _id: bookId })
        console.log(excistingBook)
        excistingBook.number--
        if (excistingBook.number > 0) {
            // const result=await carts.findOneAndDelete({_id:cartId})
            const result = await books.findById({ _id: bookId })
            console.log(result)
            res.status(200).json(result)
        }
        else {

            await excistingBook.save()
            res.status(200).json("out of stock")
        }

    }
    catch (err) {
        res.status(401).json(err)
    }

}


exports.incrNumber = async (req, res) => {
    console.log("inside increase fun")
   
  
    try {
        const bid = req.params.id
        const excistingBook = await books.findOne({ _id: bid })
        // const excistingBook=await books.findOneAndUpdate({_id: booktId},{studentid,bookingdate,status,returndate})
        excistingBook.number++
        await excistingBook.save()
        res.status(200).json(excistingBook)

        // 

    }
    catch (err) {
        res.status(401).json(err)
    }

}

exports.updateStatus=async(req,res)=>{
    const { id } = req.params
    const { status } = req.body
    console.log(req.body)
    console.log(id)
    try {
        console.log("inside status update")
        const result = await bookings.updateOne({ _id: id },{status})
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

exports.viewHistory = async (req, res) => {
    const { id } = req.params
    console.log(id)
    try {
        console.log("inside viewHistory")
        const result = await bookings.find({ studentid: id })
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}


exports.returnbook= async (req, res) => {
    const { id } = req.params
    const { status, returndate } = req.body
    console.log(req.body)
    console.log(id)
    try {
        console.log("inside return book")
        const result = await bookings.updateMany({ _id: id },{status,returndate})
        console.log(result)
        res.status(200).json(result)
    }
    catch (err) {
        res.status(401).json(err)
        console.log(err)
    }
}

exports.bookinglist = async (req, res) => {
    console.log("Inside bookinglist")
    // res.send("userslist")
    console.log(req.payload)
    try {
        const data = await bookings.find()
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }


