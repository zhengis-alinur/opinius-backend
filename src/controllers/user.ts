import UserModel from '../database/models/UserModel';
import { NextFunction, Request, Response } from 'express';
import userService from '../services/user.service';

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const users = await UserModel.findAll({});
		res.json(users);
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
		const reviews = (await userService.getReviewsById(userId)).length;
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
		const reviews = await userService.getReviewsById(userId);
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
	stats
};
