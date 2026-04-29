const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.services");
const jwt = require("jsonwebtoken");
const createMusic = async (req, res) => {


  const { title } = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id
  });
  return res.status(201).json({
    message: "Music Uploaded !",
    music: {
      id: music.id,
      music: music.uri,
      artist: music.artist,
      title: music.title,
    },
  });
};
const createAlbum = async (req, res) => {
 
    const { title, musics } = req.body;
    const album = await albumModel.create({
      title,
      musics: musics,
      artist: req.user.id,
    });
    return res.status(201).json({
      message: "Album Created Successfully !!!",
      album: {
        id: album._id,
        title: album.title,
        musics: album.musics,
        artist: album.artist,
      },
    });
};
const getAllMusics=async(req,res)=>{
const musics=await musicModel.find().limit(10).populate("artist","username email")
return res.status(200).json({
  message:"Musics Fetched Successfully !!!",
  musics:musics
})
}
const getAlbums=async(req,res)=>{
  const albums=await albumModel.find().limit(10).select(" title artist").populate("artist","username email")
  return res.status(200).json({
    message:"Albums Fetched Successfully !!",
    albums:albums
  })
}
const getAlbumById=async(req,res)=>{
const albumId=req.params.albumId
const album=await albumModel.findById(albumId).limit(10).populate("musics").populate("artist","username email")
return res.status(200).json({
  message:`Fetched Album with id ${albumId}`,
  album:album
})
}
module.exports = { createMusic , createAlbum , getAllMusics,getAlbums,getAlbumById };
