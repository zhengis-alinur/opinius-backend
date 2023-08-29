import { DataTypes, ModelDefined } from 'sequelize';
import sequelize from '..';

interface RoleAttributes {
	role: string;
}

const Role: ModelDefined<RoleAttributes, RoleAttributes> = sequelize.define('roles', {
	role: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

export default Role;
