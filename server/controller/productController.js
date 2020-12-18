import Product from '../models/productModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getAllProducts = catchAsync(async (req, res, next) => {
     const products = await Product.find();
     res.status(200).json({
     	status: 'success',
     	data: {
     		products
     	}
     })
})

export const createProduct = catchAsync(async (req, res, next) => {
	const product = await Product.create(req.body);
	res.status(201).json({
		status: 'success',
		data: {
			product
		}
	})
})