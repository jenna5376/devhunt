import { Request, Response } from 'express';
import Post from "../models/Posts";

export const getPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find();
        console.log(posts);
        res.status(200).json(posts);
    } catch (error: any) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req: Request, res: Response): Promise<void> => {
    const body = req.body;
    const post = {};
    const newPost = new Post(post);

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}
