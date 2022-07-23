const express = require("express")
const sequelize = require("../config/db")
const router = express.Router()
const User = require("../Models/usuario")
const bcrypt = require('bcryptjs');
const genarateToken = require("../utils/genarateToken");
const protect = require("../middleware/authmiddleware")


router.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    //Hash the password
    const hash = bcrypt.hashSync(password)

    const userExists = await User.findOne({where: {Email: email}})
    if (userExists) {
        return res.status(400).send("User already exists")
    }

    const user = await User.create({
        Name: name,
        Email: email,
        Password:hash
    })
    if(user) {
       res.json({
        id: user.id,
        Name: user.Name,
        Email: user.Email,
        token: genarateToken(user.id)
       })
    } else {
        res.json.status(401).json("Something went wrong on register user")
    }
})

router.post("/login", async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({where: {Email: email}})
    
    matchPassword = async(pass) => {
        return await bcrypt.compareSync(pass, user.Password); // true
    }

    if(user && await matchPassword(password)){
        res.json({
            id: user.id,
            Name: user.Name,
            Email: user.Email,
            token: genarateToken(user.id)
        })
    }else{
        res.status(400).json("Invalid Email or password")
    }
})

router.get("/user", protect,async(req, res) => {
    const { id } = req.user
    const user = await User.findByPk(id)
    if(user){
        res.json(user)
    } else{
        res.send("Not found")
    }

})

module.exports = router