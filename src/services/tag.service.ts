import { Tag } from 'types/Tag';
import TagModel from '../database/models/TagModel';

const create = async (options: Tag) => {
	await TagModel.create(options);
};

const getAll = () => TagModel.findAll({});

export default {
	create,
	getAll
};
