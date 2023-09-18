import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface LikeModel extends Model<InferAttributes<LikeModel>, InferCreationAttributes<LikeModel>> {
	reviewId: number;
	userId: number;
}

const LikeModel = sequelize.define<LikeModel>('likes', {
	reviewId: DataTypes.INTEGER,
	userId: DataTypes.INTEGER
});

export default LikeModel;
