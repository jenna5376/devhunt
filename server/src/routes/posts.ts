import express, { Router } from 'express';
import { getPosts, uploadPost, likePost } from '../controllers/posts';

const router: Router = express.Router();

router.get('/', getPosts);
router.post('/upload', uploadPost);
router.put('/like', likePost);
router.get('/likedPosts/ids', likePost);
router.put('/likedPosts', likePost);

export default router;