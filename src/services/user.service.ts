import User, { UserAttributes } from '../database/models/User';

const create = async (user: UserAttributes) => {
	await User.create(user);
};

export default {
	create
};
