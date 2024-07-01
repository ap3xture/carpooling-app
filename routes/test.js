let express = require("express")

let login = express.Router()

login.get("/test", (req,res) => {
    res.send("helo"+ req.params)
    console.log(req.query.user)
})

module.exports = login