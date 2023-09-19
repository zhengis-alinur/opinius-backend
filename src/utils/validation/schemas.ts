import Joi, { ObjectSchema } from 'joi';

const schemas: Record<string, ObjectSchema> = {
	login: Joi.object({
		email: Joi.string().email().required(),
		password: Joi.string().required()
	}),
	signup: Joi.object({
		roleId: Joi.number(),
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		username: Joi.string().required(),
		email: Joi.string().email().required(),
		password: Joi.string().required()
	})
};
export default schemas;
