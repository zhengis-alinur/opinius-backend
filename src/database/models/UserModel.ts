import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '..';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	id: number;
	roleId: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	likesCount: number;
	commentsCount: number;
	ratedCount: number;
	password: string;
	avatar: string;
}

const UserModel = sequelize.define<UserModel>('user', {
	id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
	roleId: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
	username: { type: DataTypes.STRING, allowNull: false },
	firstName: { type: DataTypes.STRING, allowNull: false },
	lastName: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	likesCount: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	commentsCount: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	ratedCount: {
		type: DataTypes.INTEGER,
		defaultValue: 0
	},
	avatar: { type: DataTypes.STRING },
	password: {
		type: DataTypes.STRING,
		allowNull: false,
		set(value: string) {
			const hash = bcrypt.hashSync(value, 10);
			this.setDataValue('password', hash);
		}
	}
});

export default UserModel;
