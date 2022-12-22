import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as areaService from './area.service';

export const createArea = catchAsync(async (req: Request, res: Response) => {
  const user = await areaService.createArea(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getAreas = catchAsync(async (req: Request, res: Response) => {
  const filter = pick({ ...req.query, isDeleted: false }, ['areaName', 'isDeleted']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await areaService.queryAreas(filter, options);
  res.send(result);
});

export const getArea = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['areaId'] === 'string') {
    const area = await areaService.getAreaById(new mongoose.Types.ObjectId(req.params['areaId']));
    if (!area) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Area not found');
    }
    res.send(area);
  }
});

export const updateArea = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['areaId'] === 'string') {
    const user = await areaService.updateAreaById(new mongoose.Types.ObjectId(req.params['areaId']), req.body);
    res.send(user);
  }
});

export const deleteArea = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['areaId'] === 'string') {
    await areaService.deleteAreaById(new mongoose.Types.ObjectId(req.params['areaId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});

// const migrateAreaWithSellers = () => {
//   await Promise.all(
//     areaData.map(async (area) => {
//       const newArea = {
//         areaName: area.areaName,
//         cityName: area.cityName,
//         description: '',
//         isDeleted: area.is_deleted === 'Y',
//       };
//       const user: any = await areaService.createArea(newArea);
//       sellersData
//         .filter((x) => x.areaId === area.id)
//         .map(async (seller) => {
//           const newSeller = {
//             areaId: user.id,
//             sellerName: seller.sellerName || '',
//             sellerShopName: seller.shopName,
//             sellerContact: seller.contact,
//             sellerAddress: seller.address || '',
//             isDeleted: seller.is_deleted === 'Y',
//           };
//           await sellerService.createSeller(newSeller);
//         });
//     })
//   );
// }
