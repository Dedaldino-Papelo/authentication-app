const jwt = require("jsonwebtoken")
const User = require("../Models/usuario")

const protect = async(req, res, next) => {
    let token;
   
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_TOKEN)
            const id = decoded.id 
            req.user = await User.findByPk(id)
            next()
        } catch (error) {
            console.log(error)
            res.status(401).send("Token failed")
            
        }
    }
    if(!token){
        res.status(401).send("No Token")
    }
}

module.exports = protect