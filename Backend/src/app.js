const cookieParser = require("cookie-parser")
const express=require("express")
const authRoutes=require("./routes/auth.routes")
const musicroutes=require("./routes/music.routes")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use("/api/auth",authRoutes)
app.use("/api/music",musicroutes)

module.exports=app;