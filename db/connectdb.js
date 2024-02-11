const mongoose =  require('mongoose')


const connectDb = () => {
    //for local db
    return mongoose.connect(process.env.LIVE_URL)

    // for cloud db
    //return mongoose.connect(database)

    .then(()=>{
        console.log("Connected sucessfully");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connectDb