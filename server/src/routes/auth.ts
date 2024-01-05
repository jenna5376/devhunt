import express, { Router } from 'express';
import { signInFail, githubAuth, githubAuthCB, googleAuth, googleAuthCB, signInSuccess, signOut } from '../controllers/auth';
const router: Router = express.Router();

router.get('/signin/success', signInSuccess)
router.get('/signin/failed', signInFail)
router.get('/signout', signOut)
router.get("/google", googleAuth);
router.get('/google/callback', googleAuthCB)
router.get('/github', githubAuth);
router.get('/github/callback', githubAuthCB)

export default router;