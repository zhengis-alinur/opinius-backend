import { NextFunction, Request, Response } from 'express';
import schemas from './schemas';

export const validateRequest = (schemaName: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		console.log(req.body);

		const schema = schemas[schemaName];
		const result = schema.validate(req.body);
		console.log('error', result.error);
		if (result.error) {
			return res.status(400).json({
				error: result.error.details[0].message
			});
		}
		req.body = result.value;
		next();
	};
};
