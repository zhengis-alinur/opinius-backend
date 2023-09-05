import { NextFunction, Request, Response } from 'express';
import roleService from '../services/role.service';
import { Role } from 'types/Role';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const roles = await roleService.getAll();
		res.json(roles);
	} catch (error) {
		next(error);
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const role = await roleService.create(req.body as Role);
		res.json({
			message: 'Tag created successfully!',
			role
		});
	} catch (error) {
		next(error);
	}
};

export default {
	getAll,
	create
};
