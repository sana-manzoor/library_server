//import express
const express=require('express')


//import controller function to resolve requests
const studentController=require('../controller/studentController')
const bookController=require('../controller/bookController')
const bookingController=require('../controller/bookingController')




//multer import
const multerConfig=require('../middleware/bookMiddleware')
const jwtMiddleware=require('../middleware/jwtMiddleware')
// const multer = require('multer')


//create object for router class in express
const router=new express.Router()


//define various paths
router.post('/student/reg',studentController.register)
router.post('/student/log',studentController.login)
router.get('/get/:id',studentController.getUser)
router.put('/std/edit/:id',multerConfig.single('profile'),studentController.editStudent)
router.put('/getem',studentController.getEm)
router.put('/changep/:id',studentController.changepass)


// router.post('/food/add',jwtiddleware,multerConfig.single('cover'),bookController.addBooks)
router.post('/book/add',jwtMiddleware,multerConfig.single('cover'),bookController.addBooks)
router.get('/allbooks',bookController.allbook)
router.get('/allbooksadm',bookController.allbooksadmin)
router.get('/allstud',studentController.studentslist)
router.get('/viewbook/:id',bookController.viewBook)
router.delete('/deleteStudent/:id',jwtMiddleware,studentController.studentdel)
router.delete('/deleteBook/:id',jwtMiddleware,bookController.bookdel)
router.put('/book/edit/:id',jwtMiddleware,multerConfig.single('cover'),bookController.editBook)



// ----------bookings-----------------
router.post('/booking/add',bookingController.addbooking)
router.get('/book/dec/:id',bookingController.decrNumber)
router.get('/book/incr/:id',bookingController.incrNumber)
router.get('/view/history/:id',bookingController.viewHistory)
router.put('/book/return/:id',bookingController.returnbook)
router.get('/booking/list',bookingController.bookinglist)
router.put('/status/book/:id',bookingController.updateStatus)





module.exports=router

