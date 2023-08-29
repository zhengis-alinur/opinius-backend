import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface UserAttributes {
	user_role_id: number;
	username: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const User: ModelDefined<UserAttributes, UserAttributes> = sequelize.define('user', {
	username: DataTypes.STRING,
	firstName: DataTypes.STRING,
	lastName: DataTypes.STRING,
	email: DataTypes.STRING,
	password: DataTypes.STRING
});

export default User;
