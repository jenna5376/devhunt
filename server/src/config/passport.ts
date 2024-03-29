import passport from 'passport'
import User from '../models/Users'

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    function(req: Request, accessToken: any, refreshToken: any, profile: any, done: any) {
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const avatar = profile.photos[0].value;
        const googleId = profile.id;
        const googleProfile = new User({
            name,
            email,
            avatar,
            googleId
        })
        User.findOne({
            googleId : googleId
        }).then( (resolvedResult) => {
            if(resolvedResult ){
                console.log('User profile already exists');
                done(null,resolvedResult);
            }else {
                googleProfile.save().then( (resolvedResult) =>{
                    console.log('Successfuly saved to DB');
                    done(null,resolvedResult);
                }, (err) => {
                    console.log('Error occured in saving to DB');
                    done(null,resolvedResult);
                });
            }
        }, (err) => {
            console.log('Error in saving user profile to DB');
        });
    }
));

passport.use(new GithubStrategy(
    {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: '/auth/github/callback',
        scope: ['user:email']
    },
    function (req: Request, accessToken: any, refreshToken: any, profile: any, done: any) {
        const name = profile.displayName;
        const email = profile.emails[0].value;
        const avatar = profile.photos[0].value;
        const githubId = profile.id;
        const githubProfile = new User({
            name,
            email,
            avatar,
            githubId
        })
        User.findOne({
            githubId : githubId
        }).then( (resolvedResult) => {
            if(resolvedResult ){
                console.log('User profile already exists');
                done(null,resolvedResult);
            }else {
                githubProfile.save().then( (resolvedResult) =>{
                    console.log('Successfuly saved to DB');
                    done(null,resolvedResult);
                }, (err) => {
                    console.log('Error occured in saving to DB' + err);
                    done(null,resolvedResult);
                });
            }
        }, (err) => {
            console.log('Error in saving user profile to DB');
        });
    }
));

passport.serializeUser((user: any, done: Function) => {
    done(null, user);
});

passport.deserializeUser((user: any, done: Function)=>{
    done(null,user);
})