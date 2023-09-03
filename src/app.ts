import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import passport from 'passport';
import session from 'express-session';

dotenv.config({ path: path.join(__dirname, '../', '.env') });

import './database';
import './database/models';
import './config/passport';

import userRouteV1 from './api/v1/user';
import authRouteV1 from './api/v1/auth';
import reviewRouteV1 from './api/v1/review';
import categoryRouteV1 from './api/v1/category';
import tagRouteV1 from './api/v1/tag';

import { errorHandler } from './middlewares';
const app = express();

app.use(
	session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false
	})
);

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRouteV1);
app.use('/api/v1/user', userRouteV1);
app.use('/api/v1/review', reviewRouteV1);
app.use('/api/v1/category', categoryRouteV1);
app.use('/api/v1/tag', tagRouteV1);

app.use(errorHandler);

export default app;
