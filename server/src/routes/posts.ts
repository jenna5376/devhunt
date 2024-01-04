import express, { Router } from 'express';
import { getPosts, createPost, likePost } from '../controllers/posts';

const router: Router = express.Router();

router.get('/', getPosts);
router.post('/create', createPost);
router.put('/like', likePost);
router.get('/likedPosts/ids', likePost);
router.put('/likedPosts', likePost);

export default router;