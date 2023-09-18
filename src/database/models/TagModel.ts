import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface TagModel extends Model<InferAttributes<TagModel>, InferCreationAttributes<TagModel>> {
	id: number;
	name: string;
}
const TagModel = sequelize.define<TagModel>('tags', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
});

export default TagModel;
