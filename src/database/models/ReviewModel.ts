import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';
import { Rating } from 'types/Review';

interface ReviewAttributes {
	id: number;
	categoryId: number;
	userId: number;
	title: string;
	ratings: Rating[];
	objectName: string;
	rating: number;
	text: string;
	grade: number;
	image: string;
}

const Review: ModelDefined<ReviewAttributes, ReviewAttributes> = sequelize.define('reviews', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	categoryId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER,
	title: DataTypes.STRING,
	objectName: DataTypes.STRING,
	text: DataTypes.STRING,
	rating: {
		type: DataTypes.FLOAT,
		defaultValue: 0
	},
	grade: DataTypes.INTEGER,
	image: DataTypes.STRING
});

export default Review;
