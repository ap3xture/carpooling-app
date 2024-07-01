let express = require('express')
let app = express()
let port = 3000

app.get("/", (req, res) => {
  res.send("pong")
})
app.use("/", require("./routes/test"))
app.use("/", require("./routes/auth"))
app.listen(port)