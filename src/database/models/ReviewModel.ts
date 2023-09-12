import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface ReviewAttributes {
	id: number;
	categoryId: number;
	userId: number;
	title: string;
	objectName: string;
	text: string;
	grade: number;
	image: string;
}

const Review: ModelDefined<ReviewAttributes, ReviewAttributes> = sequelize.define('reviews', {
	categoryId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER,
	title: DataTypes.STRING,
	objectName: DataTypes.STRING,
	text: DataTypes.STRING,
	grade: DataTypes.INTEGER,
	image: DataTypes.STRING
});

export default Review;
