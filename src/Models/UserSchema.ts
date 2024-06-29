import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'name required']
    },
    email:{
        type:String,
        required:[true, 'email requiredd'],
        unique:[true, 'email already registered'],
        validate:[validator.isEmail, 'invalid email syntax'],
    },
    password:{
        type:String,
        required:[true, 'password required'],
        minlength:[6, 'password greater than 6 digits'],
        maxlength:[15, 'password less than 6 digits'],
        select:false
    },
    image:{
        type:String
    },
    role:{
        type:String,
        default:'user',
    },
    passResetToken:String,
    passResetExp:Date
})

userSchema.pre('save',async function(next){

    if(!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password,12)
    next()
})

const User = mongoose.models.Userss || mongoose.model('Userss',userSchema)

export default User