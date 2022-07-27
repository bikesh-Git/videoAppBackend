import express from 'express'
import { deleteUser, dislike, getUser, like, subscribe, unSubscribe, update } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js'

const router = express()

//UPDATE A USER
router.put("/:id",verifyToken,update)

//DELETE USER
router.delete("/:id",verifyToken,deleteUser)

//GET A USER 
router.get("/find/:id",getUser)

//SUBSCRIBE A USER
router.put("/sub/:id",verifyToken,subscribe)

//UNSUBSCRIBE USER
router.put("/unsub/:id",verifyToken,unSubscribe)


//LIKE A VIDEO
router.put("/like/:videoId",verifyToken,like)


//DISLIKE A VIDEO 
router.put("/dislike/:videoId",verifyToken,dislike)



export default router