import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
	dialect: 'mysql',
	host: process.env.MYSQL_HOST,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_NAME
});

(async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log('Database connected and models synced');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

export default sequelize;
