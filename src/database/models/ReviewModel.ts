import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';
import { Rating } from 'types/Review';
import UserModel from './UserModel';

interface ReviewModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
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

const ReviewModel = sequelize.define('reviews', {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true
	},
	categoryId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER,
	title: DataTypes.STRING,
	objectName: DataTypes.STRING,
	text: DataTypes.TEXT('long'),
	rating: {
		type: DataTypes.FLOAT,
		defaultValue: 0
	},
	grade: DataTypes.INTEGER,
	image: DataTypes.STRING
});

export default ReviewModel;
