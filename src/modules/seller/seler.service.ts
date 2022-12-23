import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Seller from './seller.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { ISellerDoc, UpdateSellerBody, NewCreatedSeller } from './seller.interfaces';

/**
 * Create a seller
 * @param {NewCreatedSeller} sellerBody
 * @returns {Promise<ISellerDoc>}
 */
export const createSeller = async (sellerBody: NewCreatedSeller): Promise<ISellerDoc> => {
  if (await Seller.isShopNameTaken(sellerBody.sellerShopName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Shop name already exist');
  }
  return Seller.create(sellerBody);
};

/**
 * Query for sellers
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const querySellers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const sellers = await Seller.paginate(filter, options);
  return sellers;
};

/**
 * Get seller by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<ISellerDoc | null>}
 */
export const getSellerById = async (id: mongoose.Types.ObjectId): Promise<ISellerDoc | null> => Seller.findById(id);

/**
 * Get seller by area id
 * @param {mongoose.Types.ObjectId} areaId
 * @returns {Promise<ISellerDoc | null>}
 */
export const getSellersByAreaId = async (areaId: mongoose.Types.ObjectId): Promise<ISellerDoc | null> =>
  Seller.findById({ areaId });

/**
 * Update seller by id
 * @param {mongoose.Types.ObjectId} sellerId
 * @param {UpdateSellerBody} updateBody
 * @returns {Promise<ISellerDoc | null>}
 */
export const updateSellerById = async (
  sellerId: mongoose.Types.ObjectId,
  updateBody: UpdateSellerBody
): Promise<ISellerDoc | null> => {
  const seller = await getSellerById(sellerId);
  if (!seller) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
  }
  if (updateBody.sellerShopName && (await Seller.isShopNameTaken(updateBody.sellerShopName, sellerId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Shop name already exist');
  }
  Object.assign(seller, updateBody);
  await seller.save();
  return seller;
};

/**
 * Delete seller by id
 * @param {mongoose.Types.ObjectId} sellerId
 * @returns {Promise<ISellerDoc | null>}
 */
export const deleteSellerById = async (sellerId: mongoose.Types.ObjectId): Promise<ISellerDoc | null> => {
  const seller = await getSellerById(sellerId);
  if (!seller) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
  }
  await seller.remove();
  return seller;
};
