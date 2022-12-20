import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface ISeller {
  areaId: string;
  sellerName: string;
  sellerShopName: string;
  sellerContact: number;
  sellerAddress: string;
}

export interface ISellerDoc extends ISeller, Document {
  // isPasswordMatch(password: string): Promise<boolean>;
}

export interface ISellerModel extends Model<ISellerDoc> {
  isSellerTaken(sellerName: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateSellerBody = Partial<ISeller>;

export type NewCreatedSeller = ISeller;
