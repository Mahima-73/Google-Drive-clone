const express = require('express');
const app = express()
const userRouter = require('./routes/user.routes')
const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require('./config/db')
const cookieParser = require('cookie-parser');
connectToDB();

app.use(cookieParser())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);

app.set("view engine", 'ejs')
app.get('/', (req, res) => {
    res.render('index')
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});