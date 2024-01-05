import express, { Router } from 'express';
import { getPosts, uploadPost, likePost, getUserPosts, getLikedPosts, getLikedPostIds } from '../controllers/posts';

const router: Router = express.Router();

router.get('/', getPosts);
router.post('/upload', uploadPost);
router.put('/like', likePost);
router.get('/:user', getUserPosts);
router.get('/liked/:user', getLikedPosts);
router.get('/liked/ids/:user', getLikedPostIds);

export default router;