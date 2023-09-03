import User from './UserModel';
import Role from './RoleModel';
import Review from './ReviewModel';
import Comment from './CommentModel';
import Category from './CategoryModel';
import Rating from './RatingModel';
import Tag from './TagModel';
import './LikeModel';
import './ReviewTagsModel';

Review.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Tag.belongsToMany(Review, { through: 'review_tags' });
Review.belongsToMany(Tag, { through: 'review_tags' });

Review.hasMany(Comment);
Comment.belongsTo(Review);

Review.hasMany(Rating);
Rating.belongsTo(Review);

User.belongsToMany(Review, { through: 'likes' });
Review.belongsToMany(User, { through: 'likes' });

User.hasMany(Review);
Review.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.belongsTo(Role, { foreignKey: 'roleId', as: 'role' });
