import UserModel from '../database/models/UserModel';
import LikeModel from '../database/models/LikeModel';
import CommentModel from '../database/models/CommentModel';
import RatingModel from '../database/models/RatingModel';
import ReviewModel from '../database/models/ReviewModel';

const create = async (user: UserModel) => {
	await UserModel.create(user);
};
const getAll = async ({ sortBy = 'username', order = 'ASC' }: { sortBy?: string; order?: string }) =>
	UserModel.findAll({
		include: [
			{
				model: ReviewModel
			}
		],
		order: [[sortBy, order]]
	});

const findUserByEmail = (email: string) => UserModel.findOne({ where: { email } });

const getById = (id: number) => UserModel.findOne({ where: { id } });

const getLikesById = (userId: number) => LikeModel.findAll({ where: { userId } });

const block = async (ids: number[]) => {
	await UserModel.update({ blocked: true }, { where: { id: ids, blocked: false } });
};
const unBblock = async (ids: number[]) => {
	await UserModel.update({ blocked: false }, { where: { id: ids, blocked: true } });
};
const setAdmin = async (ids: number[]) => {
	const users = await UserModel.findAll({ where: { id: ids } });
	users.forEach((user) => {
		user.roleId = user.roleId === 2 ? 1 : 2;
		user.save();
	});
};

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
	getAll,
	block,
	unBblock,
	setAdmin,
	getById,
	findUserByEmail,
	getLikesById,
	getCommentsById,
	getRaitingsById,
	getFavorites
};
