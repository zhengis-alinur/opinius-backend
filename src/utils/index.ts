import { Request } from 'express';
import { User } from 'types/User';

export const getSessionUserId = (req: Request) => {
	return (req.user as User).id;
};
