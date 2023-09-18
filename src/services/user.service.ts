import { User } from 'types/User';
import UserModel from '../database/models/UserModel';
import LikeModel from '../database/models/LikeModel';
import CommentModel from '../database/models/CommentModel';
import RatingModel from '../database/models/RatingModel';
import ReviewModel from '../database/models/ReviewModel';

const create = async (user: User) => {
	await UserModel.create(user);
};

const findUserByEmail = (email: string) => UserModel.findOne({ where: { email } });
const getById = (id: number) => UserModel.findOne({ where: { id } });

const getLikesById = (userId: number) => LikeModel.findAll({ where: { userId } });

const getCommentsById = (userId: number) => CommentModel.findAll({ where: { userId } });
const getRaitingsById = (userId: number) => RatingModel.findAll({ where: { userId } });

const getFavorites = async (id: number) => {
	const reviews = await LikeModel.findAll({
		where: {
			userId: id
		},
		include: [
			{
				model: ReviewModel,
				include: [
					{
						model: CommentModel
					},
					{
						model: LikeModel
					}
				]
			}
		]
	});

	return reviews;
};
export default {
	create,
	getById,
	findUserByEmail,
	getLikesById,
	getCommentsById,
	getRaitingsById,
	getFavorites
};
