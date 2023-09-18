import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface ReviewModel extends Model<InferAttributes<ReviewModel>, InferCreationAttributes<ReviewModel>> {
	id: number;
	categoryId: number;
	userId: number;
	title: string;
	objectName: string;
	rating: number;
	text: string;
	grade: number;
	image: string;
}

const ReviewModel = sequelize.define<ReviewModel>('reviews', {
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
