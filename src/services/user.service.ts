import { User } from 'types/User';
import UserModel from '../database/models/UserModel';
import LikeModel from '../database/models/LikeModel';
import ReviewModel from '../database/models/ReviewModel';
import CommentModel from '../database/models/CommentModel';
import RatingModel from '../database/models/RatingModel';

const create = async (user: User) => {
	await UserModel.create(user);
};

const findUserByEmail = (email: string) => UserModel.findOne({ where: { email } });

const getLikesById = (userId: number) => LikeModel.findAll({ where: { userId } });
const getReviewsById = (userId: number) => ReviewModel.findAll({ where: { userId } });
const getCommentsById = (userId: number) => CommentModel.findAll({ where: { userId } });
const getRaitingsById = (userId: number) => RatingModel.findAll({ where: { userId } });

export default {
	create,
	findUserByEmail,
	getLikesById,
	getReviewsById,
	getCommentsById,
	getRaitingsById
};
