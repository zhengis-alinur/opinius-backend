import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface RatingAttributes {
	rating: number;
}

const Rating: ModelDefined<RatingAttributes, RatingAttributes> = sequelize.define('ratings', {
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false
	}
});

export default Rating;
