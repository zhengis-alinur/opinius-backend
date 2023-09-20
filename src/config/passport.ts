import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import JWTPassport from 'passport-jwt';

const JwtStrategy = JWTPassport.Strategy;
const ExtractJwt = JWTPassport.ExtractJwt;

import userService from '../services/user.service';

passport.use(
	'login',
	new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
		try {
			const user = await userService.findUserByEmail(email);
			if (!user) {
				return done(null, false, { message: 'Wrong email or password' });
			}
			if (await bcrypt.compare(password, user.password)) {
				return done(null, user, { message: 'Logged in Successfully' });
			} else {
				return done(null, false, { message: 'Wrong email or password' });
			}
		} catch (error) {
			return done(error);
		}
	})
);

passport.use(
	new JwtStrategy(
		{
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: String(process.env.JWT_SECRET)
		},
		async (jwt_payload, done) => {
			try {
				const user = await userService.findUserByEmail(jwt_payload.email);
				if (user && !user.blocked) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				return done(error, false);
			}
		}
	)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser(function (user: any, done) {
	done(null, user.email);
});

passport.deserializeUser(function (email: string, done) {
	userService
		.findUserByEmail(email)
		.then((user) => done(null, user))
		.catch((error) => done(error));
});
