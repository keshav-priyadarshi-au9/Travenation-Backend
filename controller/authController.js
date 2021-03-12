const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../config")
const User = require("../modal/userModal")

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json())

//get all user
router.get('/users',(req,res)=>{
    User.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    })
})

router.post('/register',(req,res)=>{
    const hashPassword = bcrypt.hashSync(req.body.password, 8);
    const userData = {
        name:req.body.name,
        email:req.body.email,
        password:hashPassword,
        role:req.body.role?req.body.role:'user'
    }
    User.create(userData,(err,data)=>{
        if(err) res.status(500).send("Error while registering");
        res.status(200).send("Register Success")
    })
})

router.post('/login',(req,res)=>{
    User.findOne({email:req.body.email},(err,data)=>{
        if(err) return res.status(500).send({auth:false,"error":"Error while login! Please try again."})
        if(!data) return res.status(500).send({auth:false,"error":"No user found! Please register first."})
        else{
            const matchPassword = bcrypt.compareSync(req.body.password, data.password)
            if(!matchPassword) return res.status(500).send({auth:false,"error":"Invalid Password!"})

            //now we are generating the jwt token using _id, config.js secret, expiry time
            const token = jwt.sign({id:data._id}, config.secret, {expiresIn:86400});
            res.send({auth:true,token:token})
        }
    })
})

router.get('/userInfo',(req,res)=>{
    const token = req.headers['x-access-token']

    if(!token) return res.send({auth:false, token:"No token provided"})

    jwt.verify(token, config.secret,(err,data)=>{
        if(err) return res.send({auth:false, token:"Invalid token"})
        
        User.findById(data.id,{password:0},(err,result)=>{
            if(err) throw err;
            res.send(result)
        })
    })
})

router.put('/update_password',(req,res)=>{
    const oldPassword = req.body.oldPassword
    User.find({})
})

module.exports=router;