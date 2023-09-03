import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import bcrypt from 'bcrypt';
import sequelize from '..';

interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
	roleId: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const UserModel = sequelize.define<UserModel>('user', {
	roleId: { type: DataTypes.INTEGER, allowNull: false },
	username: { type: DataTypes.STRING, allowNull: false },
	firstName: { type: DataTypes.STRING, allowNull: false },
	lastName: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
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
