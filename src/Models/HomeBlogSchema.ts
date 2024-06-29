import mongoose from "mongoose";
import Category from '@/Models/CategorySchema';

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
    }
})

const Hblog = mongoose.models.Hblog || mongoose.model('Hblog',HomeBlogSchema)

export default Hblog