import RatingModel from '../database/models/RatingModel';
import LikeModel, { LikeModelType } from '../database/models/LikeModel';
import ReviewModel from '../database/models/ReviewModel';
import { Comment, Like, Rating, Review } from '../types/Review';
import CommentModel from '../database/models/CommentModel';
import TagModel from '../database/models/TagModel';
import ReviewTagsModel from '../database/models/ReviewTagsModel';

const create = (review: Review) => ReviewModel.create(review);

const findById = async (reviewId: number) => {
	const review = await ReviewModel.findByPk(reviewId);
	const comments = await CommentModel.findAll({
		where: {
			reviewId
		}
	});
	const likes = await LikeModel.findAll({
		where: {
			reviewId
		}
	});
	const ratings = await RatingModel.findAll({
		where: {
			reviewId
		}
	});
	return { ...review, comments, likes, ratings };
};

const update = async (id: number, updateData: Partial<Review>) => {
	const review = await ReviewModel.findByPk(id);
	let updatedReview;
	if (review) {
		updatedReview = await review?.update(updateData);
	}
	return updatedReview;
};

const findLikeByUserId = (like: Pick<Like, 'reviewId' | 'userId'>) =>
	LikeModel.findOne({
		where: like
	});

const findRatingByUserId = (rating: Pick<Rating, 'reviewId' | 'userId'>) =>
	RatingModel.findOne({
		where: rating
	});
const findCommentsToReview = (reviewId: number) =>
	CommentModel.findAll({
		where: {
			reviewId
		}
	});

const unLike = async (like: LikeModelType) => {
	await like.destroy();
	await like.save();
};

const like = (like: Pick<Like, 'reviewId' | 'userId'>) => LikeModel.create(like);
const rate = (rating: Pick<Rating, 'reviewId' | 'userId' | 'rating'>) => RatingModel.create(rating);
const comment = (comment: Pick<Comment, 'reviewId' | 'userId' | 'comment'>) => CommentModel.create(comment);

const getAll = () => ReviewModel.findAll({});

const setTags = async (tags: string[], reviewId: number) => {
	const tagIds: number[] = [];

	for (const tagName of tags) {
		const tag = (
			await TagModel.findOrCreate({
				where: {
					name: tagName
				}
			})
		)[0];
		tagIds.push(tag.dataValues.id);
	}
	for (const tagId of tagIds) {
		await ReviewTagsModel.findOrCreate({
			where: {
				reviewId,
				tagId
			}
		});
	}
};

const getLikesById = (reviewId: number) => LikeModel.findAll({ where: { reviewId } });
const getCommentsById = (reviewId: number) => CommentModel.findAll({ where: { reviewId } });
const getRaitingsById = (reviewId: number) => RatingModel.findAll({ where: { reviewId } });

export default {
	findById,
	getAll,
	create,
	like,
	unLike,
	rate,
	comment,
	setTags,
	findLikeByUserId,
	findRatingByUserId,
	findCommentsToReview,
	getLikesById,
	getCommentsById,
	getRaitingsById,
	update
};
