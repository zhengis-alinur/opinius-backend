import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface RoleAttributes {
	role: string;
}

const Role: ModelDefined<RoleAttributes, RoleAttributes> = sequelize.define('roles', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
});

export default Role;
