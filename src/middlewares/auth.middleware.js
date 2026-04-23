const jwt=require("jsonwebtoken")
const authArtist=(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message:"You are not authorized"
        })
    }
    let decoded;
    try {
        decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!=="artist"){
            res.status(403).json({
                message:"You are not allowed "
            })
        }
        req.user=decoded
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message:"You are not Authorized"
        })
    }

}
module.exports={authArtist}