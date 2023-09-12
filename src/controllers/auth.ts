import { NextFunction, Request, Response } from 'express';
import { validateRequest } from '../utils/validation';
import userService from '../services/user.service';
import passport from 'passport';
import { User } from 'types/User';
import jwt from 'jsonwebtoken';

const login = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('login', async (err: Error, user: User, { message }: { message: string }) => {
		if (err || !user) {
			res.status(400);
			return next(new Error(message));
		}
		req.login({ ...user }, { session: false }, async (error) => {
			if (error) return next(error);
			const { id, email } = user;
			const token = jwt.sign({ id, email }, String(process.env.JWT_SECRET), { expiresIn: '1d' });
			return res.json({ message, user, token });
		});
	})(req, res, next);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
	req.logOut((error) => {
		if (error) next(error);
		res.json('Logged out successfully');
	});
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { email } = req.body as User;
		const user = await userService.findUserByEmail(email);
		if (user) {
			return res.status(409).json({ message: 'User with such email already exists' });
		}
		await userService.create(req.body);
		return res.status(201).json({ message: 'User created sucessfully' });
	} catch (error) {
		next(error);
	}
};

export default {
	login: [validateRequest('login'), login],
	logout,
	signup: [validateRequest('signup'), signup]
};
