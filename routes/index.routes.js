const express = require('express');
const router = express.Router();
const fileModel = require('../models/files.models')
const authMiddleware = require('../middlewares/authe') 
router.get('/home', authMiddleware, async (req, res) => {
    const userFiles = await fileModel.find({
        user: req.user.userId
    })
    console.log(userFiles)
    res.render('home', {
        files:userFiles
    });
})
const upload = require('../config/multer.config')
router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
    const newFile = await fileModel.create({
        path:req.file.path,
        Originalname: req.file.originalname,
        user: req.user.userId
    }); res.json(newFile)
})
router.get('/download/:path', authMiddleware, async (req, res) =>{
    const loggedInUserID = req.user.userId;
    const path = req.params.path;
    const file= await fileModel.findOne({
        user:loggedInUserID,
        path:path
    })
    if(!file){
        return res.status(401).json({
            message:'Unauthorized'
        })
    }
    const signedUrl= await firebase.storage().bucket().file(path).getSignedUrl({
        action:"read",
        expires:Date.now()+60*1000
    })
    res.redirect(signedUrl[0])
})
module.exports = router;