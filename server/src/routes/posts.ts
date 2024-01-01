import express, { Router } from 'express';
import { getPosts, createPost } from '../controllers/posts';

const router: Router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
