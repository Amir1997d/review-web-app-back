const passport = require("passport");
const { User } = require('./models/userModel');
const express = require('express');
passport.use(express.json());

const { addUserByGoogle, addUserByGithub } = require('./controllers/userController');


const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },
        async function(accessToken, refreshToken, profile, done) {
            await addUserByGoogle(profile);
            done(null, profile);
        }
    )
);

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
            scope: ["profile", "user:email"]
        },
        async function(accessToken, refreshToken, profile, done) {
            await addUserByGithub(profile);
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
