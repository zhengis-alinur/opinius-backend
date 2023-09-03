import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface ReviewTagsAttributes {
	reviewId: number;
	tagId: number;
}

const ReviewTags: ModelDefined<ReviewTagsAttributes, ReviewTagsAttributes> = sequelize.define('review_tags', {
	reviewId: DataTypes.INTEGER,
	tagId: DataTypes.INTEGER
});

export default ReviewTags;
