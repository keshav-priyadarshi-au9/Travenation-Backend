const express = require("express")
const app = express()
const db = require("./db")
const bodyParser = require("body-parser")
const cors = require("cors")
const port = process.env.PORT || 2400;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())

app.use(cors())



const authController = require('./controller/authController')
app.use('/api/auth', authController)

const bookings = require('./controller/bookings')
app.use('/bookings', bookings)

const chatBot = require('./controller/chatBot')
app.use('/chatbot', chatBot)

app.get("/",(req,res)=>{
    res.send({title: "Welcome to Travenation",message:"Here we will have users data and hotels bookings data"})
})

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})