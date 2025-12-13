import Joi from 'joi';

export const createOrganizationSchema = Joi.object({
  name: Joi.string().max(255).required(),
  comment: Joi.string().optional(),
});

export const updateOrganizationSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  comment: Joi.string().optional(),
});