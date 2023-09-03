import { NextFunction, Request, Response } from 'express';
import categoryService from '../services/category.service';
import { Category } from 'types/Category';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const categories = await categoryService.getAll();
		res.json(categories);
	} catch (error) {
		next(error);
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const category = await categoryService.create(req.body as Category);
		res.json({
			message: 'Category created successfully!',
			category: category
		});
	} catch (error) {
		next(error);
	}
};

export default {
	getAll: [getAll],
	create: [create]
};
