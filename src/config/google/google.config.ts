import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
passport.use(
  new GoogleStrategy.Strategy(
    {
      clientID:
        "935103441483-fe04t49s730ttrr0kcft33jbv4tjfne4.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000/google/callback",
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
      };
      try {
        console.log(newUser);
        let user = await prisma.user.findUnique({
          where: { email: profile.emails[0].value },
        });
        if (user != null) {
          console.log("User already exist");
          done(null, user);
        } else {
          console.log("add user");
          done(null, user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  )
);

passport.serializeUser(function (user: any, done: any) {
  done(null, user);
});
passport.deserializeUser(async function (user: any, done: any) {
  done(null, user);
});
