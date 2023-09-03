import { NextFunction, Request, Response } from 'express';
import tagService from '../services/tag.service';
import { Tag } from 'types/Tag';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tags = await tagService.getAll();
		res.json(tags);
	} catch (error) {
		next(error);
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const tag = await tagService.create(req.body as Tag);
		res.json({
			message: 'Tag created successfully!',
			tag
		});
	} catch (error) {
		next(error);
	}
};

export default {
	getAll: [getAll],
	create: [create]
};
