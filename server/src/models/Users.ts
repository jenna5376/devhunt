import mongoose, { Document, Schema } from 'mongoose';
import { IPost } from './Posts';

interface IUser extends Document {
    name: string;
    email: string;
    avatar: string;
    googleId: number;
    githubId: number;
    likedPosts: Array<IPost>;
    followers: Array<IUser>;
    following: Array<IUser>;
    about: string;
    publicEmail: string;
    github: string;
    website: string;
}

const UserSchema: Schema = new mongoose.Schema<IUser>({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required:true
    },
    avatar: {
        type: String,
        default: 'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'
    },
    googleId: {
        type: Number
    },
    githubId: {
        type: Number
    },
    likedPosts: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "Post",
        default: []
    },
    followers: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "Post",
        default: []
    },
    following: {
        type: [mongoose.Schema.Types.ObjectId], 
        ref: "Post",
        default: []
    },
    about: String,
    publicEmail: String,
    github: String,
    website: String
});

const User = mongoose.model<IUser>('users', UserSchema);
export default User;