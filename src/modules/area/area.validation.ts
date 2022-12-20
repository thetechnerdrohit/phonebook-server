import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { NewCreatedArea } from './area.interfaces';

const createUserBody: Record<keyof NewCreatedArea, any> = {
  areaName: Joi.string().required(),
  cityName: Joi.string().required(),
  description: Joi.string().required(),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};

export const getAreas = {
  query: Joi.object().keys({
    areaName: Joi.string(),
    cityName: Joi.string(),
    description: Joi.string(),
    projectBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getArea = {
  params: Joi.object().keys({
    areaId: Joi.string().custom(objectId),
  }),
};

export const updateArea = {
  params: Joi.object().keys({
    areaId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      areaName: Joi.string(),
      cityName: Joi.string(),
      description: Joi.string(),
    })
    .min(1),
};

export const deleteArea = {
  params: Joi.object().keys({
    areaId: Joi.string().custom(objectId),
  }),
};
