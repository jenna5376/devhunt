import passport from "passport"

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require("passport-github2").Strategy;

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },

    function(req: Request, accessToken: any, refreshToken: any, profile: any, done: any) {
        // const id = profile.id;
        // const email = profile.emails[0].value;
        // const firstName = profile.name.givenName;
        // const lastName = profile.name.familyName;
        // const profilePhoto = profile.photos[0].value;
        // const newUser = {
        //     id,
        //     email,
        //     firstName,
        //     lastName,
        //     profilePhoto
        // }
        done(null, profile)

        /**
         * const user = {
         *  username; profile.displayName,
         *  avatar: profile.photos[0]
         * }
         * user.save()
         */
    }
));

passport.use(
    new GithubStrategy(
        {
            clientID: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
        },
        function (req: Request, accessToken: any, refreshToken: any, profile: any, done: any) {
            const id = profile.id;
            const name = profile.displayName;
            const profilePhoto = profile.photos[0].value;
            const newUser = {
                id,
                name,
                profilePhoto
            }
            console.log(newUser)
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done: Function) => {
    done(null, user);
});

passport.deserializeUser((user, done: Function)=>{
    done(null, user)
})