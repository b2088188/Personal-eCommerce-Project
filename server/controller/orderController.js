import Order from '../models/orderModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createOrder = catchAsync(async (req, res, next) => {
	let order = await Order.create({user: req.user._id, ...req.body});

	res.status(201).json({
		status: 'success',
		data: {
			order
		}
	})
})

export const getOrder = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);
	if(!order)
		return next(new AppError('No order found with that ID', 404));
	res.status(200).json({
		status: 'success',
		data: {
			order
		}
	})
})

export const updateOrderToPaid = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.id);		
	order.processOrder(req.body);
	const updatedOrder = await order.save();
	res.status(200).json({
		status: 'success',
		data: {
			order: updatedOrder
		}
	})
});