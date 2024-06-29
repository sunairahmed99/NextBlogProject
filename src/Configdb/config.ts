import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

export function connect(){

    mongoose.set('strictQuery',true)
    mongoose.connect(process.env.DB_URL!)
    let connection = mongoose.connection
    connection.on('connected',()=> console.log('connectedd'))
    connection.on('error',(err)=>{
        console.log('errror'+err)
        process.exit()
    })
}