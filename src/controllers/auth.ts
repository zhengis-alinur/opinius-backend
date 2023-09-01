import { RequestHandler } from 'express';
import { validateRequest } from '../utils/validation';
import userService from '../services/user.service';

export const login: RequestHandler = (req, res) => {
	console.log('Login', req.body);
	return res.json({
		message: 'Login Successfully'
	});
};

export const signup: RequestHandler = async (req, res, next) => {
	try {
		await userService.create(req.body);
		return res.json('User created sucessfully');
	} catch (err) {
		next(err);
	}
};

export default {
	login: [validateRequest('login'), login],
	signup: [validateRequest('signup'), signup]
};
