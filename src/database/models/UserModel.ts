import { DataTypes, InferAttributes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '..';

export interface UserCreateAttributes {
	username?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
	avatar?: string;
	googleId?: string;
}

interface UserModel extends Model<InferAttributes<UserModel>, UserCreateAttributes> {
	id: number;
	roleId: number;
	blocked: boolean;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	googleId: string;
	likesCount: number;
	commentsCount: number;
	ratedCount: number;
	password: string;
	avatar: string;
}

const UserModel = sequelize.define<UserModel>('user', {
	id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
	roleId: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 1 },
	blocked: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
	username: { type: DataTypes.STRING, allowNull: true },
	firstName: { type: DataTypes.STRING, allowNull: true },
	lastName: { type: DataTypes.STRING, allowNull: true },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	googleId: { type: DataTypes.STRING, allowNull: true },
	likesCount: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	commentsCount: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	ratedCount: {
		type: DataTypes.INTEGER,
		allowNull: true,
		defaultValue: 0
	},
	avatar: { type: DataTypes.STRING, allowNull: true },
	password: {
		type: DataTypes.STRING,
		allowNull: true,
		set(value: string) {
			const hash = bcrypt.hashSync(value, 10);
			this.setDataValue('password', hash);
		}
	}
});

export default UserModel;
