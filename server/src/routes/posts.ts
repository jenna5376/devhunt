import express, { Router } from 'express';
import { getPosts, getPostById, uploadPost, likeOrUnlike, getUserPosts, getLikedPosts, getLikedPostIds,deletePost } from '../controllers/posts';

const router: Router = express.Router();

router.get('/', getPosts);
router.get('/:post', getPostById)
router.post('/upload', uploadPost);
router.put('/likeOrUnlike', likeOrUnlike);
router.get('/by/:user', getUserPosts);
router.get('/liked/:user', getLikedPosts);
router.get('/liked/ids/:user', getLikedPostIds);
router.delete('/:post',deletePost)

export default router;