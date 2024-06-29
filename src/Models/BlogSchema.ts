import mongoose from "mongoose";
import Category from '@/Models/CategorySchema';
import User from '@/Models/UserSchema';

const HomeBlogSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true, 'name required']
    },
    description:{
        type:String,
        required:[true, 'description required'],
    },
    image:{
        type:String
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Category
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }
})

const Blog = mongoose.models.Blogs || mongoose.model('Blogs',HomeBlogSchema)

export default Blog