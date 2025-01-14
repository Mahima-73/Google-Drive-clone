const express = require('express');
const router = express.Router();
const fileModel = require('../models/files.models')
router.get('/home',  (req, res) => {
    res.render('home');
})
const upload = require('../config/multer.config')
router.post('/upload', upload.single('file'), async (req, res) => {
    const newFile = await fileModel.create({
        path:req.file.path,
        Originalname: req.file.originalname,
    })
})
module.exports = router;