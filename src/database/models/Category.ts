import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface CategoryAttributes {
	category: string;
}

const Category: ModelDefined<CategoryAttributes, CategoryAttributes> = sequelize.define('categories', {
	category: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export default Category;
