import RatingModel from '../database/models/RatingModel';
import LikeModel from '../database/models/LikeModel';
import ReviewModel from '../database/models/ReviewModel';
import { Comment, Like, Rating, Review } from '../types/Review';
import CommentModel from '../database/models/CommentModel';
import TagModel from '../database/models/TagModel';
import ReviewTagsModel from '../database/models/ReviewTagsModel';
import UserModel from '../database/models/UserModel';
import { Op, Sequelize } from 'sequelize';

const create = (review: Review) => ReviewModel.create(review);
const deleteReviews = (ids: number[]) =>
	ReviewModel.destroy({
		where: {
			id: ids
		}
	});

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
			},
			{
				model: TagModel
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

const unLike = async (like: LikeModel) => {
	const review = await ReviewModel.findByPk(like.reviewId);
	if (review) {
		const user = await UserModel.findByPk(review.userId);
		if (user) {
			user.likesCount -= 1;
			user.save();
		}
		await like.destroy();
		await like.save();
	}
};

const like = async (like: Pick<Like, 'reviewId' | 'userId'>) => {
	const review = await ReviewModel.findByPk(like.reviewId);
	if (review) {
		const user = await UserModel.findByPk(review.userId);
		if (user) {
			user.likesCount += 1;
			user.save();
		}
		LikeModel.create(like);
	}
};
const rate = async (data: Pick<Rating, 'reviewId' | 'userId' | 'rating'>) => {
	const oldRatingsCount = (
		await RatingModel.findAll({
			where: {
				reviewId: data.reviewId
			}
		})
	).length;
	const review = await ReviewModel.findOne({ where: { id: data.reviewId } });
	if (review) {
		const newRating = parseFloat(
			((review.rating * oldRatingsCount + data.rating) / (oldRatingsCount + 1)).toFixed(1)
		);
		await ReviewModel.update({ rating: newRating }, { where: { id: data.reviewId } });
		await RatingModel.create(data);
		const user = await UserModel.findByPk(review.userId);
		if (user) {
			user.ratedCount += 1;
			user.save();
		}
	}
	return review;
};
const comment = async (comment: Pick<Comment, 'reviewId' | 'userId' | 'comment'>) => {
	const review = await ReviewModel.findByPk(comment.reviewId);
	if (review) {
		const user = await UserModel.findByPk(review.userId);
		if (user) {
			user.commentsCount += 1;
			user.save();
		}
		LikeModel.create(comment);
	}
	CommentModel.create(comment);
};

const getAll = async ({
	id,
	keyword,
	sortBy = 'title',
	order = 'ASC'
}: {
	id?: number;
	keyword?: string;
	sortBy?: string;
	order?: string;
}) => {
	const options: { where: Record<string, any> } = {
		where: {}
	};

	if (id) {
		options.where = { userId: id };
	}

	if (keyword) {
		options.where = {
			...options.where,
			[Op.or]: [
				Sequelize.literal(`MATCH(title) AGAINST(:keyword IN BOOLEAN MODE)`),
				Sequelize.literal(`MATCH(text) AGAINST(:keyword IN BOOLEAN MODE)`),
				Sequelize.literal(`MATCH(objectName) AGAINST(:keyword IN BOOLEAN MODE)`)
			]
		};
	}

	return ReviewModel.findAll({
		include: [
			{
				model: LikeModel
			},
			{
				model: CommentModel
			},
			{
				model: RatingModel
			},
			{
				model: TagModel
			}
		],
		...options,
		replacements: { keyword },
		order: [[sortBy, order]]
	});
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
		tagIds.push(tag.id);
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
	deleteReviews,
	update
};
