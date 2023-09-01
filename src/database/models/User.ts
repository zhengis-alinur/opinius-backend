import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

export interface UserAttributes {
	roleId: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const User: ModelDefined<UserAttributes, UserAttributes> = sequelize.define('user', {
	roleId: { type: DataTypes.INTEGER, allowNull: false },
	username: { type: DataTypes.STRING, allowNull: false },
	firstName: { type: DataTypes.STRING, allowNull: false },
	lastName: { type: DataTypes.STRING, allowNull: false },
	email: { type: DataTypes.STRING, allowNull: false, unique: true },
	password: { type: DataTypes.STRING, allowNull: false }
});

export default User;
