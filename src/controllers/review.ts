import { NextFunction, Request, Response } from 'express';

import { getSessionUserId } from '../utils';
import { Like, Rating, Comment } from '../types/Review';
import reviewService from '../services/review.service';

const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviewId = parseInt(req.query.id as string);
		const review = await reviewService.findById(reviewId);
		res.json(review);
	} catch (error) {
		next(error);
	}
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviews = await reviewService.getAll();
		res.json(reviews);
	} catch (error) {
		next(error);
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { tags, ...options } = req.body;
		const review = await reviewService.create({ userId: getSessionUserId(req), ...options });
		await reviewService.setTags(tags, review.dataValues.id);
		res.json({
			message: 'Review created successfully!',
			review
		});
	} catch (error) {
		next(error);
	}
};

const like = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userId = getSessionUserId(req);
		const { reviewId } = req.body as Like;

		const review = await reviewService.findById(reviewId);
		if (!review) {
			return res.status(404).json('No such review');
		}

		const like = await reviewService.findLikeByUserId({
			userId,
			reviewId
		});
		if (like) {
			await reviewService.unLike(like);
			return res.status(200).json({
				message: 'Review unliked successfully!'
			});
		}

		await reviewService.like({
			userId,
			reviewId
		});
		res.status(200).json({
			message: 'Review liked successfully!'
		});
	} catch (error) {
		next(error);
	}
};

const rate = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { reviewId, rating } = req.body as Rating;
		const userId = getSessionUserId(req);

		const review = await reviewService.findById(reviewId);
		if (!review) {
			return res.status(404).json('No such review');
		}

		const ratingReview = await reviewService.findRatingByUserId({
			userId,
			reviewId
		});
		if (ratingReview) {
			return res.status(409).json({
				message: 'Rating from user already exists!'
			});
		}

		await reviewService.rate({ rating, userId, reviewId });
		res.status(200).json({
			message: 'Review rated successfully!'
		});
	} catch (error) {
		next(error);
	}
};

const comment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { reviewId, comment } = req.body as Comment;
		console.log(req.body);
		const userId = getSessionUserId(req);

		const review = await reviewService.findById(reviewId);
		if (!review) {
			return res.status(404).json('No such review');
		}

		await reviewService.comment({ comment, userId, reviewId });
		res.status(200).json({
			message: 'Review commented successfully!'
		});
	} catch (error) {
		next(error);
	}
};

export default {
	getAll,
	getById,
	create,
	like,
	rate,
	comment
};
