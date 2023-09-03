import { NextFunction, Request, Response } from 'express';
import { validateRequest } from '../utils/validation';
import userService from '../services/user.service';
import passport from 'passport';
import { User } from 'types/User';

const login = (req: Request, res: Response, next: NextFunction) => {
	passport.authenticate('local')(req, res, next);
};
const loginSuccess = async (req: Request, res: Response) => {
	res.status(200).json({
		message: 'Authenticated successfully'
	});
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
	login: [validateRequest('login'), login, loginSuccess],
	logout,
	signup: [validateRequest('signup'), signup]
};
