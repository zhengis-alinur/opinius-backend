import { NextFunction, Request, Response } from 'express';

export function notFound(err: Error, req: Request, res: Response, next: NextFunction) {
	if (res.status(404)) {
		return next(new Error(`Not Found - ${req.originalUrl}`));
	}
	next();
}

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(res.statusCode !== 200 ? res.statusCode : 500);
	const responseBody = {
		message: error.message
	};
	console.error('Error:', responseBody);
	res.json(responseBody);
	next(error);
};

export const isUserAuthenticated = (req: Request, res: Response, next: NextFunction) => {
	if (req.user) {
		next();
	} else {
		res.status(401).send('You must login first!');
	}
};
