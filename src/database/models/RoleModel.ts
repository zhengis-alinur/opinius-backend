import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import sequelize from '..';

interface RoleModel extends Model<InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
	name: string;
}

const RoleModel = sequelize.define<RoleModel>('roles', {
	name: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	}
});

export default RoleModel;
