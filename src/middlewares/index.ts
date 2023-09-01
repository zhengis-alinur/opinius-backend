import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response, next: NextFunction) {
	res.status(404);
	const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
	next(error);
}

export function errorHandler(error: Error, req: Request, res: Response) {
	const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
	res.status(statusCode);
	const responseBody = {
		message: error.message
	};
	console.error('Error:', responseBody);
	res.json(responseBody);
}
