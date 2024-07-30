const books=require('../model/bookSchema')



exports.addBooks = async (req, res) => {
    console.log("Inside booksadd Function!!")
    // console.log(req.file.filename)
    
    const { title, author, description,category,number, userId} = req.body
    console.log(req.body)
    // console.log(`${title},${author},${category},${description},${userId},${number}`)
     const cover=req.file.filename
    //  res.send("addfooditems request is hit!!")
    try{
        const excistingBook=await books.findOne({description})
        if(excistingBook){
            res.status(406).json("Excisting book")
        }
        else{
            const newBook=new books({ title, author, description,category,cover,number, userId})
            await newBook.save()
            res.status(200).json(newBook)
        }
    }
    catch(err){
        res.status(401).json("Something Went Wrong!! " + err)
    }
}


exports.allbook = async (req, res) => {
    console.log("Inside bookslist")
    // res.send("userslist")
    console.log(req.payload)
    try {
        const data = await books.find()
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }

 exports.viewBook = async (req,res)=>{
    const {id}=req.params
    try{
        console.log("inside viewbook")
        const result=await books.find({id:id})
        console.log(result)
        res.status(200).json(result)
    }
    catch(err){
        res.status(401).json(err)
    }
}


exports.bookdel = async (req, res) => {
    console.log("Inside bookdelete")
    // res.send("userslist")
    const {id}=req.params
    try {
        const data = await books.findByIdAndDelete({_id:id})
        console.log(data)
        res.status(200).json(data)

    }
    catch (err) {
        res.status(401).json(err)
    }
 }

 exports.editBook = async (req, res) => {
    const {title, author, description,category,number,userId}=req.body
    console.log(req.body)
    const uploadedFile=req.file?req.file.filename:req.body.cover
    const {id}=req.params
    try{
      console.log("inside edit")
      const result=await books.findByIdAndUpdate({_id:id},{title, author, description,category,cover:uploadedFile,number,userId})
      console.log(result)
      res.status(200).json(result)
    }
    catch(err){
        console.log(err)
      res.status(401).json(err)
    }
    //  res.send(`${title},${price},${uploadedFile},${id}`)
  }


  

