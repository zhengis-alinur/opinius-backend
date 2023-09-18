import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
	name: string;
}

const CategoryModel = sequelize.define<CategoryModel>('categories', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
});

export default CategoryModel;
