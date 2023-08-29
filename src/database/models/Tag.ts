import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface TagAttributes {
	tag: string;
}
const Tag: ModelDefined<TagAttributes, TagAttributes> = sequelize.define('tags', {
	tag: DataTypes.STRING
});

export default Tag;
