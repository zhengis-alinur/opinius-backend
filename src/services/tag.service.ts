import { Tag } from 'types/Tag';
import TagModel from '../database/models/TagModel';
import ReviewTagsModel from '../database/models/ReviewTagsModel';

const create = async (options: Tag) => {
	await TagModel.create(options);
};

const getAll = () => TagModel.findAll({});

const getStats = async () => {
	const tags = await TagModel.findAll({});
	const stats: { value: string; count: number }[] = [];
	for (let i = 0; i < tags.length; i++) {
		const count = (await ReviewTagsModel.findAndCountAll({ where: { tagId: tags[i].id } })).count;
		stats.push({ value: tags[i].name, count });
	}
	return stats;
};

export default {
	create,
	getAll,
	getStats
};
