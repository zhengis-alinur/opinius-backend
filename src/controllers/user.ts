import UserModel from '../database/models/UserModel';
import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';
import reviewService from '../services/review.service';
import ReviewModel from '../database/models/ReviewModel';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserModel.findAll({
			include: {
				model: ReviewModel
			}
		});
		res.json(users);
	} catch (error) {
		next(error);
	}
};

const setAvatar = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, imageUrl } = req.body;
		const user = await UserModel.findByPk(id);
		if (user) {
			user.avatar = imageUrl;
			user.save();
			res.json(user);
		}
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { ids } = req.body;
		await UserModel.destroy({ where: { id: ids } });
		res.json('Users successfully deleted');
	} catch (error) {
		next(error);
	}
};

const block = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { ids } = req.body;
		await userService.block(ids);
		res.json('Users updated successfully');
	} catch (error) {
		next(error);
	}
};

const setAdmin = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { ids } = req.body;
		await userService.setAdmin(ids);
		res.json('Users updated successfully');
	} catch (error) {
		next(error);
	}
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id } = req.query as { id: string };
		const users = await userService.getById(parseInt(id));
		res.json(users);
	} catch (error) {
		next(error);
	}
};

const comments = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.query.id as string);
		const comments = await userService.getCommentsById(userId);
		res.json(comments);
	} catch (error) {
		next(error);
	}
};

const likes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.query.id as string);
		const likes = await userService.getLikesById(userId);
		res.json(likes);
	} catch (error) {
		next(error);
	}
};

const stats = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.query.id as string);
		const likes = (await userService.getLikesById(userId)).length;
		const comments = (await userService.getCommentsById(userId)).length;
		const ratings = (await userService.getRaitingsById(userId)).length;
		const reviews = (await reviewService.getAll({ userId })).length;
		res.json({ reviews, likes, comments, ratings });
	} catch (error) {
		next(error);
	}
};

const ratings = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.query.id as string);
		const raitings = await userService.getRaitingsById(userId);
		res.json(raitings);
	} catch (error) {
		next(error);
	}
};

const reviews = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.query.id as string);
		const reviews = await reviewService.getAll({ userId });
		res.json(reviews);
	} catch (error) {
		next(error);
	}
};

const favorites = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = parseInt(req.query.id as string);
		const reviews = await userService.getFavorites(userId);
		res.json(reviews);
	} catch (error) {
		next(error);
	}
};

export default {
	getAll,
	comments,
	likes,
	ratings,
	reviews,
	getById,
	favorites,
	stats,
	deleteUser,
	block,
	setAdmin,
	setAvatar
};
