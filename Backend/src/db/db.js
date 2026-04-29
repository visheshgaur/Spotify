const mongoose=require("mongoose")
const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connnected to Database")
    } catch (error) {
        console.log("error in connection", error)
    }
}
module.exports=connectDb