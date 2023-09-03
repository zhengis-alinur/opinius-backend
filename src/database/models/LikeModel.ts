import { DataTypes, Model, ModelDefined } from 'sequelize';
import sequelize from '..';

interface LikeAttributes {
	reviewId: number;
	userId: number;
}

const Like: ModelDefined<LikeAttributes, LikeAttributes> = sequelize.define('likes', {
	reviewId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER
});

export type LikeModelType = Model<LikeAttributes, LikeAttributes>;

export default Like;
