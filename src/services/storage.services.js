const {ImageKit}=require('@imagekit/nodejs');
const ImagekitClient= new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATEKEY
})

const uploadFile=async(file)=>{
const result=await ImagekitClient.files.upload({
    file,
    fileName:"music"+Date.now(),
    folder:"Spotify/musics"
})
return result
}

module.exports={uploadFile}