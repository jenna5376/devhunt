import passport from 'passport';
import {Request, Response, NextFunction} from 'express';

const CLIENT_URL = 'http://localhost:3000/'

export const signInSuccess = (req: Request, res: Response) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Successful',
            user: req.user,
            cookies: req.cookies
        })
    }
}

export const signInFail = (req: Request, res: Response) => {
    res.status(401).json({
        success: false,
        message: 'failed to authenticate user'
    })
}

export const signOut = (req: Request, res: Response, next: NextFunction)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
    res.redirect(CLIENT_URL);
}

export const googleAuth = passport.authenticate("google", { 
    scope: ['profile', 'email'],
    session: true
})

export const googleAuthCB = passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/signin/failed',
    session: true
})

export const githubAuth = passport.authenticate('github', {
    scope: ['profile', 'user:email']
})

export const githubAuthCB = passport.authenticate('github', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/signin/failed'
})