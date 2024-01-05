import express, { Router } from 'express';
import { editProfile } from '../controllers/profile';

const router: Router = express.Router();

router.post('/edit', editProfile)

export default router;