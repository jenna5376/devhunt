import mongoose, { Document, Schema } from 'mongoose';

interface IPost extends Document {
    title: string;
    creator: string;
    tags: string[];
    githubLink: string;
    demoLink?: string;
    selectedFile: string;
    viewCount: number;
    likeCount: number;
    createdAt: Date;
}

const PostSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: String, required: true },
    tags: [String],
    githubLink: { type: String, required: true },
    demoLink: String,
    // selectedFile: { type: String, required: true },
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
