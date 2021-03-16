const mongoose = require("mongoose")
const config = require("./config/dbUrl")



// const url = "mongodb://localhost:27017/travenation"
const url = config.dburl

mongoose.connect(url)