import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    avatar: string;
    googleId: number;
    githubId: number;
}

const UserSchema: Schema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        trim:true,
        lowercase:true,
        required:true
    },
    password: { 
        type: String
    },
    avatar: {
        type: String,
        default: "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
    },
    googleId: {
        type: Number
    },
    githubId: {
        type: Number
    }
});

const User = mongoose.model<IUser>('users', UserSchema);

export default User;