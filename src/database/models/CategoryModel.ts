import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface CategoryAttributes {
	name: string;
}

const Category: ModelDefined<CategoryAttributes, CategoryAttributes> = sequelize.define('categories', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
});

export default Category;
