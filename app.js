const express = require("express")
const app = express()
const db = require("./db")
const port = process.env.PORT || 2400;

const cors = require("cors")
app.use(cors())

const authController = require('./controller/authController')
app.use('/api/auth', authController)

const bookings = require('./controller/bookings')
app.use('/bookings', bookings)

app.get("/",(req,res)=>{
    res.send({title: "Welcome to Travenation",message:"Here we will have users data and hotels bookings data"})
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})