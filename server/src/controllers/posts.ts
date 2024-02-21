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

export const getPostById = async (req: Request, res: Response): Promise<void> => {
    const postId = req.params.post;
    try {
        const updatedPost = await Post.findOneAndUpdate( 
            {_id: postId}, 
            {$inc: { viewCount: +1 } },
            {new: true}
        );
        console.log("successfully viewed post")
        res.status(200).json(updatedPost);
    } catch (error: any) {
        res.status(500).json(error)
    }
}

export const uploadPost = async (req: Request, res: Response): Promise<void> => {
    const post = {...req.body};
    const newPost = new Post(post);
    
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export const editPost = async(req: Request, res: Response): Promise<void> => {
    console.log("edited post")
    const post = {...req.body};
    try {
        const updatedPost = await Post.findOneAndUpdate( 
            {_id: post.id}, 
            {$set: {...post} },
            {new: true}
        );
        console.log(updatedPost)
        res.status(201).send({post: updatedPost})
    } catch(err) {
        res.status(500).json(err)
    }
}

//todo make this togglable
export const likeOrUnlike = async (req: Request, res: Response): Promise<void> => {
    const postId = req.body.postId;
    const userId = req.body.userId;
    
    try {
        const post = await Post.findById(postId);
        const user = await User.findById(userId);
        if (user && post){
            if (user.likedPosts.includes(postId)) {
                user.likedPosts.splice(postId,1);
                await user.save();
                const updatedPost = await Post.findOneAndUpdate( 
                    {_id: postId}, 
                    {$inc: { likeCount: -1 } },
                    {new: true}
                );
                res.status(201).send({user, post: updatedPost})
                console.log("successfully unliked post");
            }
            else {
                user.likedPosts.push(post);
                await user.save();
                const updatedPost = await Post.findOneAndUpdate( 
                    {_id: postId}, 
                    {$inc: { likeCount: +1 } },
                    {new: true}
                );
                res.status(201).send({user, post: updatedPost})
                console.log("successfully liked post");
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

export const deletePost = async (req: Request, res: Response): Promise<void>=> {
    try {
        const postId = req.params.post;
        const result = await Post.deleteOne({
            _id: postId
        })
        if (result.deletedCount==1) {
            console.log("successfully deleted post")
            const result = await User.updateMany(
                {likedPosts: postId},
                {$pull:{likedPosts: postId}}
            )
            res.status(201).send({message: result})
        }
        else {
            res.status(500).send({message:"error finding post to delete"})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

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

export const getLikedPostIds = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.params.user);
        res.status(201).json(user?.likedPosts);
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