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
      required: false,
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
      required: false,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
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
 * @param {string} sellerShopName - The area name
 * @param {ObjectId} [excludeUserId] - The id of the area to be excluded
 * @returns {Promise<boolean>}
 */
sellerSchema.static(
  'isSellerTaken',
  async function (sellerShopName: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
    const seller = await this.findOne({ sellerShopName, _id: { $ne: excludeUserId } });
    return !!seller;
  }
);

const Seller = mongoose.model<ISellerDoc, ISellerModel>('Seller', sellerSchema);

export default Seller;
