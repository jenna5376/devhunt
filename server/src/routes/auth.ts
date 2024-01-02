const passport = require('passport')
import {Request, Response} from 'express';
import express, { Router } from 'express';

const CLIENT_URL = 'http://localhost:3000/'
const router: Router = express.Router();

router.get('/signin/success', (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Successful',
            user: req.user,
            cookies: req.cookies
        })
    }
})

router.get('/signout', (req: Request, res: Response, next)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    res.redirect(CLIENT_URL);
})

router.get('/signin/failed', (req: Request, res: Response) => {
    res.status(401).json({
        success: false,
        message: 'failed to authenticate user'
    })
})

router.get("/google", passport.authenticate("google", { 
    scope: ['profile', 'email'],
    session: true
    }
));

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/signin/failed',
        session: true
    })
)

router.get('/github', passport.authenticate('github', 
    {scope: ['profile', 'user:email']}
));

router.get('/github/callback', 
    passport.authenticate('github', {
        successRedirect: CLIENT_URL,
        failureRedirect: '/signin/failed'
    })
)

export default router;