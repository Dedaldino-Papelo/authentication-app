const express = require("express")
const app = express()
const User = require('./Routes/User')
const cors = require("cors")
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(User)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server running on port " + PORT)
})