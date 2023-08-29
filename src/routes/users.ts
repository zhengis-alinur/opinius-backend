import express, { Request, Response } from 'express';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
	try {
		console.log('get post request');
		res.status(201).json('success');
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: 'Failed to create user' });
	}
});

export default router;
