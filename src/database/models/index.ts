import User from './User';
import Role from './Role';
import Review from './Review';
import Comment from './Comment';
import Category from './Category';
import Rating from './Rating';
import Tag from './Tag';

Category.belongsToMany(Review, { through: 'review_categories' });
Review.belongsToMany(Category, { through: 'review_categories' });

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

User.belongsToMany(Role, { through: 'user_roles' });
Role.belongsToMany(User, { through: 'user_roles' });
