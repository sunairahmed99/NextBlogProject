import mongoose from 'mongoose';
import User from '@/Models/UserSchema';
import Blog from '@/Models/BlogSchema';

const CommentSchema = new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    blogid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Blog
    },
    comment:{
        type:String,
        required:[true, 'comment required']
    }
})

const Comment = mongoose.models.Comment || mongoose.model('Comment',CommentSchema);

export default Comment