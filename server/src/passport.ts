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
    function(accessToken: any, refreshToken: any, profile: any, cb:any, done:any) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        // return cb(err, user);
        // });
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
      function (accessToken: any, refreshToken: any, profile: any, cb:any, done:any) {
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