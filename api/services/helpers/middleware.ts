import bodyParser from "body-parser";
import cors, { CorsOptions } from "cors";
import { Application, Request } from "express";
import { HydratedDocument } from "mongoose";
import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { IUser } from "../../interfaces/user.interfaces";
import userModel from "../../models/user.model";
import { IAuthToken } from "./auth-token-generation";

type Middleware = (app: Application) => void

const middlewares = {

  logs: (app: Application) => {
    if (process.env.NODE_ENV !== "production") {
      app.all('*', (req, res, next) => {

        if (req.method !== "OPTIONS") {
          console.log('\x1b[90m', JSON.stringify({ url: req.url, method: req.method, body: req.body }))
        }

        next()
      })
    }
  },

  bodyParser: (app: Application) => {
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
  },

  cors: (app: Application) => {

    const corsOpts: CorsOptions = {
      origin: '*',
      methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'Authorization']
    }

    app.use(cors(corsOpts))
  },

  passport: (app: Application) => {

    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: process.env.SECRET,
      issuer: process.env.ISSUER
    }

    passport.use(new JwtStrategy(options, (req: Request, payload: IAuthToken, done: VerifiedCallback) => {
      userModel.findById(payload.id)
        .then((user) => {
          return done(null, !!user ? user : !!user)
        })
        .catch(err => {
          return done(err, false)
        })
    }))

    app.all("*", (req, res, next) => {
      return passport.authenticate("jwt", { session: false, failWithError: true }, (err: any, user?: HydratedDocument<IUser>) => {
        if (err) { return next(err) }
        if (!!user) {
          req.user = user
        }

        return next()
      })(req, res, next)
    })
  }

} as { [key: string]: Middleware }

export default function middleware(app: Application) {
  for (const middleware of Object.values(middlewares)) {
    middleware(app)
  }
}