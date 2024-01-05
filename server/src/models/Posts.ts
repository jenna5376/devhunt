import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
    title: string;
    image: string;
    creator: mongoose.Schema.Types.ObjectId,
    github: string;
    website: string;
    viewCount: number;
    likeCount: number;
    createdAt: Date;
    readme: boolean;
}

const PostSchema: Schema = new mongoose.Schema<IPost>({
    title: { 
        type: String, 
        required: true 
    },
    image: {
        type: String,
        required: true
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
    github: { 
        type: String, 
        required: true 
    },
    website: String,
    viewCount: {
        type: Number,
        default: 0
    },
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    readme: {
        type: Boolean,
        required: true
    }
});

const Post = mongoose.model<IPost>('posts', PostSchema);
export default Post;