import { DataTypes, Model, ModelDefined } from 'sequelize';
import sequelize from '..';

interface TagAttributes {
	id: number;
	name: string;
}
const Tag: ModelDefined<TagAttributes, TagAttributes> = sequelize.define('tags', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
});

export type LikeModelType = Model<TagAttributes, TagAttributes>;

export default Tag;
