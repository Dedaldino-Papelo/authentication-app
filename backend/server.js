const express = require("express")
const app = express()
const User = require('./Routes/User')
const cors = require("cors")
require('dotenv').config()
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(User)

//=====================================

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,'dist')))
    
  app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  }) 
}

  

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})