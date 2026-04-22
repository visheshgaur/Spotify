const musicModel=require("../models/music.model")
const {uploadFile}=require("../services/storage.services")
const jwt=require("jsonwebtoken")
const createMusic=async(req,res)=>{
    const token=req.cookies.token;
    
    if(!token){
        return res.status(401).json({
            message:"Unauthorized 1"
        })
    }
    let decoded;
    try {
        decoded=jwt.verify(token,process.env.JWT_SECRET)
       

        if(decoded.role!="artist"){
            return res.status(403).json({
                message:"You are not authorized to create an music"
            })

        }
    } catch (error) {
      
    return res.status(401).json({
        message: error.message          
    })
    }
    
    
const {title}=req.body;
const file=req.file

const result=await uploadFile(file.buffer.toString("base64"))

const music=await musicModel.create({
    uri:result.url,
    title,
    artist:decoded.id
})
return res.status(201).json({
    message:"Music Uploaded !",
    music:{
        id:music.id,
        music:music.uri,
        artist:music.artist,
        title:music.title
    }
})
}
module.exports={createMusic}