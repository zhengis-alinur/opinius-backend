import RoleModel from '../database/models/RoleModel';
import { Role } from 'types/Role';

const create = async (options: Role) => {
	await RoleModel.create(options);
};

const getAll = () => RoleModel.findAll({});

export default {
	create,
	getAll
};
