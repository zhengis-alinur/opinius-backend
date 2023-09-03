import { Category } from 'types/Category';
import CategoryModel from '../database/models/CategoryModel';

const create = async (options: Category) => {
	await CategoryModel.create(options);
};

const getAll = () => CategoryModel.findAll({});

export default {
	create,
	getAll
};
