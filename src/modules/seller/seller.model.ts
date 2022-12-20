import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { ISellerDoc, ISellerModel } from './seller.interfaces';

const sellerSchema = new mongoose.Schema<ISellerDoc, ISellerModel>(
  {
    areaId: {
      type: String,
      required: true,
      ref: 'Area',
    },
    sellerName: {
      type: String,
      required: true,
      trim: true,
    },
    sellerShopName: {
      type: String,
      required: true,
      trim: true,
    },
    sellerContact: {
      type: Number,
      required: true,
      minlength: 10,
      maxlength: 10,
    },
    sellerAddress: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
sellerSchema.plugin(toJSON);
sellerSchema.plugin(paginate);

/**
 * Check if areaName is taken
 * @param {string} sellerName - The area name
 * @param {ObjectId} [excludeUserId] - The id of the area to be excluded
 * @returns {Promise<boolean>}
 */
sellerSchema.static(
  'isSellerTaken',
  async function (sellerName: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
    const seller = await this.findOne({ sellerName, _id: { $ne: excludeUserId } });
    return !!seller;
  }
);

const Seller = mongoose.model<ISellerDoc, ISellerModel>('Seller', sellerSchema);

export default Seller;
