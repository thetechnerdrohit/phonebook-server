import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IArea {
  areaName: string;
  cityName: string;
  description: string;
}

export interface IAreaDoc extends IArea, Document {
  // isPasswordMatch(password: string): Promise<boolean>;
}

export interface IAreaModel extends Model<IAreaDoc> {
  isAreaTaken(area: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateAreaBody = Partial<IArea>;

export type NewRegisteredArea = Omit<IArea, 'role' | 'isEmailVerified'>;

export type NewCreatedArea = Omit<IArea, '_id'>;
