import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface RatingAttributes {
	rating: number;
	reviewId: number;
	userId: number;
}

const Rating: ModelDefined<RatingAttributes, RatingAttributes> = sequelize.define('ratings', {
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	reviewId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER
});

export default Rating;
