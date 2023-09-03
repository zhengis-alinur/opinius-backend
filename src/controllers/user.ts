import UserModel from '../database/models/UserModel';
import { NextFunction, Request, Response } from 'express';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserModel.findAll({});
		res.json(users);
	} catch (error) {
		next(error);
	}
};

export default {
	getAll
};
