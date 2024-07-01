let express = require("express")
let session = require("express-session")

let auth = express.Router()

auth.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'shhhh, very secret'
}));

let db = {
    apex:{
        user:"apex",
        pass:"apex"
    }
}

let authenticate = (user, pass, cb) => {
    if(!db[user]) return cb("user not found",null)
    if(db[user].user == user && db[user].pass != pass) return cb("incorrect password",null)
    if(db[user].user == user && db[user].pass == pass) return cb(null,db[user])
}

auth.get("/login", (req,res) => {
    authenticate(req.query.user,req.query.pass, (err,user) => {
        if(err) {
            res.send(err)
            return 0
        }
        if(user) {
            req.session.regenerate(()=>{
                req.session.user = user
                res.send("succesfully authenticated")
            })
            return 0
        }
    })
})

auth.get("/logout", (req,res) => {
    req.session.destroy(function(){
        res.redirect('/');
      });
})

module.exports = auth