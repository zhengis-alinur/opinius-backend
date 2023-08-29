import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface CommentAttributes {
	text: string;
}

const Comment: ModelDefined<CommentAttributes, CommentAttributes> = sequelize.define('comments', {
	text: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export default Comment;
