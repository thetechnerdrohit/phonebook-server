import mongoose from 'mongoose';
import toJSON from '../toJSON/toJSON';
import paginate from '../paginate/paginate';
import { IAreaDoc, IAreaModel } from './area.interfaces';

const areaSchema = new mongoose.Schema<IAreaDoc, IAreaModel>(
  {
    areaName: {
      type: String,
      required: true,
      trim: true,
    },
    cityName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
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
areaSchema.plugin(toJSON);
areaSchema.plugin(paginate);

/**
 * Check if areaName is taken
 * @param {string} areaName - The area name
 * @param {ObjectId} [excludeUserId] - The id of the area to be excluded
 * @returns {Promise<boolean>}
 */
areaSchema.static('isAreaTaken', async function (areaName: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
  const area = await this.findOne({ areaName, _id: { $ne: excludeUserId } });
  return !!area;
});

const Area = mongoose.model<IAreaDoc, IAreaModel>('Area', areaSchema);

export default Area;
