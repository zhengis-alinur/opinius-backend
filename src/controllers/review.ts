import { NextFunction, Request, Response } from 'express';

import { getSessionUserId } from '../utils';
import { Like, Rating, Comment, Review } from '../types/Review';
import reviewService from '../services/review.service';
import userService from '../services/user.service';

const getById = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviewId = parseInt(req.query.id as string);
		const review = await reviewService.findById(reviewId);
		if (review && review.userId) {
			const user = await userService.getById(review.userId);
			res.json({ review: { ...review.dataValues }, user });
		}
	} catch (error) {
		next(error);
	}
};

const getAll = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { keyword } = req.query as { keyword: string };
		const reviews = await reviewService.getAll({ keyword });
		res.json(reviews);
	} catch (error) {
		next(error);
	}
};

const create = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { tags, ...options } = req.body;
		console.log(options);
		const review = await reviewService.create({ userId: getSessionUserId(req), ...options });
		await reviewService.setTags(tags, review.id);
		res.json({
			message: 'Review created successfully!',
			review
		});
	} catch (error) {
		next(error);
	}
};

const deleteReviews = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { ids } = req.body;
		await reviewService.deleteReviews(ids);
		res.json({
			message: 'Reviews deleted successfully!'
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

		const ratedReview = await reviewService.rate({ rating, userId, reviewId });
		res.status(200).json(ratedReview);
	} catch (error) {
		next(error);
	}
};

const comment = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { reviewId, comment } = req.body as Comment;
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

const comments = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviewId = parseInt(req.query.id as string);
		const comments = await reviewService.getCommentsById(reviewId);
		res.json(comments);
	} catch (error) {
		next(error);
	}
};
const likes = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviewId = parseInt(req.query.id as string);
		const likes = await reviewService.getLikesById(reviewId);
		res.json(likes);
	} catch (error) {
		next(error);
	}
};
const ratings = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviewId = parseInt(req.query.id as string);
		const raitings = await reviewService.getRaitingsById(reviewId);
		res.json(raitings);
	} catch (error) {
		next(error);
	}
};

const getRating = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviewId = parseInt(req.query.id as string);
		const userId = getSessionUserId(req);
		const review = await reviewService.findById(reviewId);
		const ratings = await reviewService.getRaitingsById(reviewId);
		let rated = false;
		ratings.forEach((rating) => {
			if (!rated && rating.userId === userId) {
				rated = true;
			}
		}, 0);
		res.json({
			rated,
			rating: review?.rating
		});
	} catch (error) {
		next(error);
	}
};

const getLike = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const reviewId = parseInt(req.query.id as string);
		const userId = getSessionUserId(req);
		const likes = await reviewService.getLikesById(reviewId);
		likes.forEach((like) => {
			if (like.userId == userId) {
				return res.json(true);
			}
		});
		res.json(false);
	} catch (error) {
		next(error);
	}
};

const update = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { id, tags, ...updatedData } = req.body as Review;
		const updated = await reviewService.update(id, updatedData);
		if (!updated) {
			return res.status(404).json('Review did not updated');
		}
		await reviewService.setTags(tags, updated.id);
		res.json(updated);
	} catch (error) {
		next(error);
	}
};

export default {
	create,
	update,
	deleteReviews,
	getAll,
	getById,
	like,
	rate,
	comment,
	comments,
	likes,
	ratings,
	getRating,
	getLike
};
