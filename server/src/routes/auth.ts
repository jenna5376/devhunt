const passport = require('passport')
import {Request, Response} from 'express';
import express, { Router } from 'express';

const CLIENT_URL = 'http://localhost:3000/'
const router: Router = express.Router();

//fix cookies
router.get('/signin/success', (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Successful',
            user: req.user,
            cookies: req.cookies
        })
    }
    res.send('fail')
})

router.get('/signout', (req: Request, res: Response)=>{
    // req.logout(); 
    res.redirect(CLIENT_URL);
})

router.get('/signin/failed', (req: Request, res: Response) => {
    res.status(401).json({
        success: false,
        message: 'failed to authenticate user'
    })
})

router.get('/google', passport.authenticate('google', {scope: ['profile']}));

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/signin/failed'
    })
)

////////////
router.get('/github', passport.authenticate('github', {scope: ['profile']}));

router.get('/github/callback', 
    passport.authenticate('github', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/signin/failed'
    })
)

export default router;