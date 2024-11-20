const express= require("express")
const app=express()
const mongoose=require("mongoose")
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const homeRoutes= require("./routes/homeRoutes")
const userRoutes= require("./routes/userRoutes")
const postRoutes= require("./routes/postRoutes")
const methodOverride = require("method-override");
const connectDB=require("./config/database")
require("dotenv").config({path:"./config/.env"})
// Passport config
require('./config/passport')(passport)

const PORT=3000
connectDB()
app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
//Use forms for put / delete
app.use(methodOverride("_method"));

// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store:  MongoStore.create({ mongoUrl: "mongodb+srv://pgurung1:Hitman1812!@cluster0.4vwrv.mongodb.net/member?retryWrites=true&w=majority&appName=Cluster0"
      
       }),  

    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use("/",homeRoutes)

app.use("/profile",postRoutes)

app.use("/user",userRoutes)




app.listen(process.env.PORT || PORT, ()=>{
    console.log('Server is running, you better catch it!')
}) 