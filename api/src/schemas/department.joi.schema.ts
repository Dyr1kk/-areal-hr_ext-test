import Joi from 'joi';

export const createDepartmentSchema = Joi.object({
  name: Joi.string().max(255).required(),
  organization_id: Joi.string().uuid().required(),
  parent_id: Joi.string().uuid().optional().allow(null),
  comment: Joi.string().optional(),
});

export const updateDepartmentSchema = Joi.object({
  name: Joi.string().max(255).optional(),
  organization_id: Joi.string().uuid().optional(),
  parent_id: Joi.string().uuid().optional().allow(null),
  comment: Joi.string().optional(),
});