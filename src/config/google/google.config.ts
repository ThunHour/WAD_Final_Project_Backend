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
          console.log("User does not exist");
          const addUser = await prisma.user.create({
            data: {
              email: profile.emails[0].value,
              name: profile.name.givenName as string,
              password: profile.id,
            },
          });

          done(null, user);
        }
      } catch (error) {
        console.error(error);
      }
    }
  )
);

passport.serializeUser(function (user: any, done: any) {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  prisma.user.findUnique({ where: { id: id } }).then((user: any) => {
    done(null, user);
  });
});
