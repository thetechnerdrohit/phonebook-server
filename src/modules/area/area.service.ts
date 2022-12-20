import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Area from './area.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { NewCreatedArea, IAreaDoc, NewRegisteredArea, UpdateAreaBody } from './area.interfaces';

/**
 * Create a user
 * @param {NewCreatedUser} areaBody
 * @returns {Promise<IAreaDoc>}
 */
export const createArea = async (areaBody: NewCreatedArea): Promise<IAreaDoc> => {
  if (await Area.isAreaTaken(areaBody.areaName)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Area already exsit');
  }
  return Area.create(areaBody);
};

/**
 * Register a user
 * @param {NewRegisteredUser} userBody
 * @returns {Promise<IAreaDoc>}
 */
export const registerUser = async (userBody: NewRegisteredArea): Promise<IAreaDoc> => {
  // if (await Area.isEmailTaken(userBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return Area.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryAreas = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const users = await Area.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IAreaDoc | null>}
 */
export const getAreaById = async (id: mongoose.Types.ObjectId): Promise<IAreaDoc | null> => Area.findById(id);

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IAreaDoc | null>}
 */
export const getUserByEmail = async (email: string): Promise<IAreaDoc | null> => Area.findOne({ email });

/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} areaId
 * @param {UpdateAreaBody} updateBody
 * @returns {Promise<IAreaDoc | null>}
 */
export const updateAreaById = async (
  areaId: mongoose.Types.ObjectId,
  updateBody: UpdateAreaBody
): Promise<IAreaDoc | null> => {
  const area = await getAreaById(areaId);
  if (!area) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Area not found');
  }
  if (updateBody.areaName && (await Area.isAreaTaken(updateBody.areaName, areaId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Area name already exist');
  }
  Object.assign(area, updateBody);
  await area.save();
  return area;
};

/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} areaId
 * @returns {Promise<IAreaDoc | null>}
 */
export const deleteAreaById = async (areaId: mongoose.Types.ObjectId): Promise<IAreaDoc | null> => {
  const user = await getAreaById(areaId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Area not found');
  }
  await user.remove();
  return user;
};
