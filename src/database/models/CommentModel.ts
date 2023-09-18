import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface CommentModel extends Model<InferAttributes<CommentModel>, InferCreationAttributes<CommentModel>> {
	comment: string;
	reviewId: number;
	userId: number;
}

const CommentModel = sequelize.define<CommentModel>('comments', {
	reviewId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER,
	comment: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export default CommentModel;
