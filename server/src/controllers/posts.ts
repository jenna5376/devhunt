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

export const uploadPost = async (req: Request, res: Response): Promise<void> => {
    const post = {...req.body};
    const newPost = new Post(post);

    try {
        await newPost.save();
        console.log(newPost)
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(409).json({ message: error.message });
    }
}

//todo make this togglable
export const likePost = async (req: Request, res: Response): Promise<void> => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    
    try {
        const post = await Post.findById(postId);
        const user = await User.findById(userId);
        if (user && post){
            user.likedPosts.push(post);
            await user.save();
            const updatedPost = await Post.findOneAndUpdate( 
                {_id: postId}, 
                {$inc: { likeCount: +1 } },
                {new: true}
            );
            res.status(201).send({user, post: updatedPost})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

// //get id of liked posts
// export const getLikedPostIDs = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const user = await User.findById(req.params.userId);
//         res.status(201).json({ likedPosts: user?.likedPosts });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// }

export const getLikedPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.user);
        const likedPosts = await Post.find({
            _id: { $in: user?.likedPosts },
        });
        res.status(201).json(likedPosts);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

export const getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({creator: req.params.user}).sort({date: -1}).lean();
        res.status(200).send(posts);
    }
    catch (err) {
        res.status(500).json(err);
    }
}