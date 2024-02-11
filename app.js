const express = require('express');
const app = express()
const dotenv = require('dotenv');
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDb = require('./db/connectdb')
const fileUpload = require("express-fileupload");
const cookieParser = require('cookie-parser')
const cors = require('cors')

// for running / calling api
app.use(cors())

// for getting token in auth
app.use(cookieParser())

//temp file uploader
app.use(fileUpload({useTempFiles: true}));

// for getting data in api
app.use(express.json()) 

connectDb()


//Load route

app.use('/api',web)
//localhost:4000/api









//SERVER CREATE
app.listen(process.env.PORT,() =>{
    console.log(`server running on localhost: ${process.env.PORT}`)
})