import RatingModel from '../database/models/RatingModel';
import LikeModel, { LikeModelType } from '../database/models/LikeModel';
import ReviewModel from '../database/models/ReviewModel';
import { Comment, Like, Rating, Review } from '../types/Review';
import CommentModel from '../database/models/CommentModel';
import TagModel from '../database/models/TagModel';
import ReviewTagsModel from '../database/models/ReviewTagsModel';

const create = (review: Review) => ReviewModel.create(review);

const findById = async (reviewId: number) => {
	const review = await ReviewModel.findOne({
		where: {
			id: reviewId
		},
		include: [
			{
				model: CommentModel
			},
			{
				model: LikeModel
			},
			{
				model: RatingModel
			}
		]
	});
	return review;
};

const update = async (id: number, updateData: Partial<Review>) => {
	const review = await ReviewModel.findByPk(id);
	if (review) {
		review.update(updateData);
		await review.save();
	}
	return review;
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
const rate = async (data: Pick<Rating, 'reviewId' | 'userId' | 'rating'>) => {
	const oldRatingsCount = (
		await RatingModel.findAll({
			where: {
				reviewId: data.reviewId
			}
		})
	).length;
	const review = (await ReviewModel.findOne({ where: { id: data.reviewId } }))?.dataValues;
	if (review) {
		const newRating = parseFloat(
			((review.rating * oldRatingsCount + data.rating) / (oldRatingsCount + 1)).toFixed(1)
		);
		await ReviewModel.update({ rating: newRating }, { where: { id: data.reviewId } });
		await RatingModel.create(data);
	}
	return review;
};
const comment = (comment: Pick<Comment, 'reviewId' | 'userId' | 'comment'>) => CommentModel.create(comment);

const getAll = async ({ userId }: { userId?: number } = {}) => {
	const options = {
		include: [
			{
				model: LikeModel
			},
			{
				model: CommentModel
			},
			{
				model: RatingModel
			}
		],
		where: {}
	};
	if (userId) {
		options.where = {
			userId
		};
	}
	return ReviewModel.findAll(options);
};

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
