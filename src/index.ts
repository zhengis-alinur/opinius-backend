import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(__dirname, '../', '.env') });

import sequelize from './database';
import './database/models';
import usersRoute from './routes/users';

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', usersRoute);

(async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log('Database connected and models synced');
	} catch (error) {
		console.error('Unable to connect to the database:', error);
	}
})();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
