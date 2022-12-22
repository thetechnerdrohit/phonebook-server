import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import catchAsync from '../utils/catchAsync';
import ApiError from '../errors/ApiError';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as sellerService from './seler.service';

export const createSeller = catchAsync(async (req: Request, res: Response) => {
  const seller = await sellerService.createSeller(req.body);
  res.status(httpStatus.CREATED).send(seller);
});

export const getSellers = catchAsync(async (req: Request, res: Response) => {
  const filter = pick({ ...req.query, isDeleted: false }, ['areaId', 'isDeleted']);
  const options: IOptions = pick({ ...req.query, limit: 20 }, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await sellerService.querySellers(filter, options);
  res.send(result);
});

export const getSeller = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['sellerId'] === 'string') {
    const seller = await sellerService.getSellerById(new mongoose.Types.ObjectId(req.params['sellerId']));
    if (!seller) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found');
    }
    res.send(seller);
  }
});

export const updateSeller = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['sellerId'] === 'string') {
    const seller = await sellerService.updateSellerById(new mongoose.Types.ObjectId(req.params['sellerId']), req.body);
    res.send(seller);
  }
});

export const deleteSeller = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['sellerId'] === 'string') {
    await sellerService.deleteSellerById(new mongoose.Types.ObjectId(req.params['sellerId']));
    res.status(httpStatus.NO_CONTENT).send();
  }
});
