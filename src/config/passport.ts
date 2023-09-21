import passport from 'passport';
import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import JWTPassport from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const JwtStrategy = JWTPassport.Strategy;
const ExtractJwt = JWTPassport.ExtractJwt;

import userService from '../services/user.service';
import UserModel from '../database/models/UserModel';

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

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env['GOOGLE_CLIENT_ID'] || '',
			clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || '',
			callbackURL: process.env['GOOGLE_REDIRECT_URL'],
			scope: ['profile', 'email'],
			passReqToCallback: true,
			state: true
		},
		async function verify(req, accessToken, refreshToken, profile, cb) {
			try {
				const defaultUser = {
					firstName: profile.name?.givenName,
					lastName: profile.name?.familyName,
					username: profile.username,
					email: profile._json.email,
					googleId: profile.id,
					password: profile._json.sub,
					avatar: profile._json.picture
				};
				const user = await UserModel.findOrCreate({
					where: { googleId: profile.id },
					defaults: defaultUser
				}).catch((err) => {
					console.log('Error signing up', err);
					cb(err, false);
				});
				if (user && user[0]) return cb(null, user && user[0]);
			} catch (err: any) {
				return cb(err);
			}
		}
	)
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
passport.serializeUser((user: any, cb) => {
	console.log('Serializing user:', user);
	cb(null, user.id);
});

passport.deserializeUser(async (id: number, cb) => {
	const user = await UserModel.findByPk(id).catch((err) => {
		console.log('Error deserializing', err);
		cb(err, null);
	});
	console.log('DeSerialized user', user);
	if (user) cb(null, user);
});
