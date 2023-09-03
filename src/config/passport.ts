import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';

import userService from '../services/user.service';

passport.use(
	new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (email, password, done) => {
		try {
			const user = await userService.findUserByEmail(email);
			if (!user) {
				return done(null, false);
			}
			if (await bcrypt.compare(password, user.password)) {
				done(null, user);
			} else {
				return done(null, false);
			}
		} catch (error) {
			return done(error);
		}
	})
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
