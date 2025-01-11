const express = require('express');
const router = express.Router();
const{body, validationResult} = require('express-validator');
const userModel = require('../models/user.models');
const bcrypt = require('bcrypt');

router.get('/register', (req, res) => {
    res.render('register');
})
router.post('/register', 
    body('email').trim().isEmail({min:10}),
    body('password').trim().isLength({min:5}),
    body('username').trim().isLength({min:3}),
     async (req,res) => {
        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                error : error.array(),
                message: 'Invalid data'})}
        const {email, password, username} = req.body;
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            email, 
            password: hashPassword,
            username
        })
        res.json(newUser)})


        

module.exports = router;