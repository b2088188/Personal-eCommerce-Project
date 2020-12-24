import Order from '../models/orderModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createOrder = catchAsync(async (req, res, next) => {
	const order = await Order.create({user: req.user._id, ...req.body});
	res.status(201).json({
		status: 'success',
		data: {
			order
		}
	})
})