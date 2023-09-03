import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface CommentAttributes {
	comment: string;
	reviewId: number;
	userId: number;
}

const Comment: ModelDefined<CommentAttributes, CommentAttributes> = sequelize.define('comments', {
	comment: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export default Comment;
