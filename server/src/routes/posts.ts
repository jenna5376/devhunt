import express, { Router } from 'express';
import { getPosts, uploadPost, likePost, getUserPosts, getLikedPosts } from '../controllers/posts';

const router: Router = express.Router();

router.get('/', getPosts);
router.post('/upload', uploadPost);
router.put('/like', likePost);
router.get('/:user', getUserPosts);
router.get('/:user/liked', getLikedPosts);
// router.put('/likedPosts', likePost);

export default router;