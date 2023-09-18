import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface ReviewTagsModel extends Model<InferAttributes<ReviewTagsModel>, InferCreationAttributes<ReviewTagsModel>> {
	reviewId: number;
	tagId: number;
}

const ReviewTagsModel = sequelize.define<ReviewTagsModel>('review_tags', {
	reviewId: DataTypes.INTEGER,
	tagId: DataTypes.INTEGER
});

export default ReviewTagsModel;
