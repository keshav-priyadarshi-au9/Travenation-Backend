const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    hotel_name:String,
    name:String,
    email:String,
    phone:Number,
    checkIn:String,
    checkOut:String,
    status:String
})

mongoose.model('bookings', bookingSchema); //here user is the name of database collection

module.exports=mongoose.model('bookings')