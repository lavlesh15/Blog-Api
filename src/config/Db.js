const mongoose = require('mongoose')
require('dotenv').config();
const url = process.env.MONGODB_URL;

exports.connectToDb = () => {
    mongoose.connect(url ,{
        useNewUrlParser:true,
        useUnifiedTopology:true 
    })
    .then((conn)=> {
        console.log('conected to Database')
    })
    .catch(err => {
        console.log(err)
    })
}