import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config({ path: path.join(__dirname, '../', '.env') });

import './database';
import './database/models';

import usersRoute from './routes/users';
import authRoute from './routes/auth';
import { errorHandler } from './middlewares';
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/users', usersRoute);
app.use('/', authRoute);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(errorHandler);

export default app;
