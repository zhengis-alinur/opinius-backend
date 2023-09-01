import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface TagAttributes {
	tag: string;
}
const Tag: ModelDefined<TagAttributes, TagAttributes> = sequelize.define('tags', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
});

export default Tag;
