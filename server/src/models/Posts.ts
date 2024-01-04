import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
    title: string;
    creator: mongoose.Schema.Types.ObjectId,
    tags: string[];
    github: string;
    website?: string;
    selectedFile: string;
    viewCount: number;
    likeCount: number;
    createdAt: Date;

    //add image url
}

const PostSchema: Schema = new mongoose.Schema<IPost>({
    title: { 
        type: String, 
        required: true 
    },
    creator: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    tags: [String],
    github: { 
        type: String, 
        required: true },
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
    }
});

const Post = mongoose.model<IPost>('posts', PostSchema);
export default Post;
