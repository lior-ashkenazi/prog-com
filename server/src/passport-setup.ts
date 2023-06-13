import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as GitHubStrategy } from "passport-github2";
import axios from "axios";

import User from "./models/userModel";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      const newUser = {
        googleId: profile.id,
        userName: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      };

      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        done(null, user);
      } else {
        user = await User.create(newUser);
        done(null, user);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      callbackURL: "/api/auth/github/callback",
      scope: ["user:email"],
    },
    async (accessToken: string, refreshToken: string, profile: any, done: any) => {
      const emails = await axios.get("https://api.github.com/user/emails", {
        headers: {
          Authorization: `token ${accessToken}`,
        },
      });
      const primaryEmail = emails.data.find((email: any) => email.primary).email;

      const newUser = {
        githubId: profile.id,
        username: profile.displayName,
        image: profile.photos[0].value,
      };

      try {
        let user = await User.findOne({ githubId: profile.id });

        if (user) {
          done(null, user);
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);
