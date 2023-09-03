import { User } from 'types/User';
import UserModel from '../database/models/UserModel';

const create = async (user: User) => {
	await UserModel.create(user);
};

const findUserByEmail = (email: string) => UserModel.findOne({ where: { email } });

export default {
	create,
	findUserByEmail
};
