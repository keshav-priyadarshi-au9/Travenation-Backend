const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
const config = require("../config")
const booking = require("../modal/bookingModal")

router.use(bodyParser.json())


//see all bookings
router.get('/',(req,res)=>{
    const token = req.headers['x-access-token']

    if(!token) return res.send({auth:false, token:"No token provided"})

    jwt.verify(token, config.secret,(err,data)=>{
        if(err) return res.send({auth:false, token:"Invalid token"})
        
        booking.find({},(err,data)=>{
            if(err) throw err
            res.send(data)
        })
    })
})


//generate booking
router.post('/generate_booking',(req,res)=>{
    const token = req.headers['x-access-token']
    const bookingData = {
        hotel_name:req.body.hotel_name,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        status:req.body.status
    }

    if(!token) return res.send({auth:false, token:"No token provided"})

    jwt.verify(token, config.secret,(err,data)=>{
        if(err) return res.send({auth:false, token:"Invalid token"})
        
        booking.create(bookingData,(err,data)=>{
            if(err) throw err
            res.send({auth:true, success:"Booking Success"})
        })
    })
})

//admin accept booking
router.post('/accept_booking',(req,res)=>{
    let id = req.body._id
   
    booking.find({_id:id},(err,data)=>{
        if(err) throw err
        if(data){
            booking.updateOne({_id:id},{status:"Confirm"},(err,data)=>{
                if(err) {return res.status(500).send("action failed")}
                res.send({auth:true, success:"Booking has been approved"})
            })
        }
    })
})

//admin reject booking
router.post('/reject_booking',(req,res)=>{
    let id = req.body._id
   
    booking.find({_id:id},(err,data)=>{
        if(err) throw err
        if(data){
            booking.updateOne({_id:id},{status:"Rejected"},(err,data)=>{
                if(err) {return res.status(500).send("action failed")}
                res.send({auth:true, success:"Booking has been rejected"})
            })
        }
    })
})



module.exports=router