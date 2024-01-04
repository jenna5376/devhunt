import { Request, Response } from 'express';
import Post from "../models/Posts";
import User from '../models/Users';

export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const post = {...req.body};
    const newPost = new Post(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

//todo make this togglable
export const likePost = async (req: Request, res: Response): Promise<void> => {
    const post = await Post.findById(req.body.postID);
    const user = await User.findById(req.body.userID);
    try {
        if (user && post){
        user.likedPosts.push(post);
        await user.save();
        res.status(201).json({ likedPosts: user.likedPosts });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

//get id of liked posts
export const getLikedPostIDs = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.userId);
        res.status(201).json({ likedPosts: user?.likedPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

//get saved posts
export const getLikedPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.userId);
        const likedPosts = await Post.find({
            _id: { $in: user?.likedPosts },
        });
        res.status(201).json({ likedPosts });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}