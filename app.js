const express = require("express")
const app = express()
const db = require("./db")
const port = 2400;

const cors = require("cors")
app.use(cors())

const authController = require('./controller/authController')
app.use('/api/auth', authController)

const bookings = require('./controller/bookings')
app.use('/bookings', bookings)

app.get("/",(req,res)=>{
    res.send("we will learn JWT")
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})