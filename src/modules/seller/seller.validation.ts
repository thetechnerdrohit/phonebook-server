import Joi from 'joi';
import { objectId } from '../validate/custom.validation';
import { NewCreatedSeller } from './seller.interfaces';

const createUserBody: Record<keyof NewCreatedSeller, any> = {
  areaId: Joi.required().custom(objectId),
  sellerName: Joi.string().optional(),
  sellerShopName: Joi.string().required(),
  sellerContact: Joi.string().min(10).max(10).required(),
  sellerAddress: Joi.string(),
  isDeleted: Joi.bool(),
};

export const createUser = {
  body: Joi.object().keys(createUserBody),
};

export const getSellers = {
  query: Joi.object().keys({
    areaId: Joi.custom(objectId),
    sellerName: Joi.string(),
    sellerShopName: Joi.string(),
    sellerContact: Joi.number(),
    sellerAddress: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const getSeller = {
  params: Joi.object().keys({
    sellerId: Joi.string().custom(objectId),
  }),
};
export const getSellersByArea = {
  params: Joi.object().keys({
    areaId: Joi.string().custom(objectId),
  }),
};

export const updateSeller = {
  params: Joi.object().keys({
    sellerId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      id: Joi.string(),
      areaId: Joi.string(),
      sellerName: Joi.string(),
      sellerShopName: Joi.string(),
      sellerContact: Joi.number(),
      sellerAddress: Joi.string(),
      isDeleted: Joi.bool(),
    })
    .min(1),
};

export const deleteSeller = {
  params: Joi.object().keys({
    sellerId: Joi.string().custom(objectId),
  }),
};
