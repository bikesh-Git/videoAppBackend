import { createError } from "../error.js"
import User from "../models/User.js"
import Video from "../models/Video.js"

export const update  =async (req,res,next)=>{

    if(req.params.id == req.info.id){
        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
            res.status(200).json(updatedUser)
        }
        catch(err){
            next(err)
        }
    }
    else{
      return next(createError   (403,"you can update only your account"))
    }

}


export const deleteUser  =async (req,res,next)=>{
    if(req.params.id == req.info.id){
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted")
        }
        catch(err){
            next(err)
        }
    }
    else{
      return next(createError   (403,"you can delete only your account"))
    }
}

export const getUser  = async(req,res,next)=>{
    try{
        const user =  await User.findById(req.params.id)
        res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}   

export const subscribe  = async(req,res,next)=>{
    if(req.info.id == req.params.id)  return next(createError   (403,"you cannot subscribe  your account"))
 
    try{
        await User.findByIdAndUpdate(req.info.id,{
            $push:{subscibedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:1}
        })
        res.status(200).json("subscription successfull")
    }
    catch(err){
        next(err)
    }
}

export const unSubscribe  = async(req,res,next)=>{
    try{
        await User.findByIdAndUpdate(req.info.id,{
            $pull:{subscibedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1}
        })
        res.status(200).json("unSubscription successfull")
    }
    catch(err){
        next(err)
    }
}

export const like  = async(req,res,next)=>{
    try{
        const id = req.info.id
        const videoId = req.params.videoId
          await Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("this video has been liked")
    }
    catch(err){
        next(err)
    }
}

export const dislike  = async(req,res,next)=>{
    try{
        const id = req.info.id
        const videoId = req.params.videoId
      await Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("this video has been disliked")
    }
    catch(err){
        next(err)
    }
}