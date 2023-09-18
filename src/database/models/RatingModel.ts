import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface RatingModel extends Model<InferAttributes<RatingModel>, InferCreationAttributes<RatingModel>> {
	rating: number;
	reviewId: number;
	userId: number;
}

const RatingModel = sequelize.define<RatingModel>('ratings', {
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	reviewId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER
});

export default RatingModel;
