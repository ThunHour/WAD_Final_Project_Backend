import passport from "passport";
import passportStrategy from "passport-facebook";
import { PrismaClient, User } from "@prisma/client";
import config from "../config";
const prisma = new PrismaClient();

const FacebookStrategy = passportStrategy.Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: config.CLIENT_ID_FB as string,
      clientSecret: config.CLIENT_SECRET_FB as string,
      callbackURL: "http://localhost:3000/facebook/callback",
      profileFields: ["id", "emails", "name"],
    },
    async function (
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      const newUser = {
        facebookId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
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
