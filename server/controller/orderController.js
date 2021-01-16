import Order from '../models/orderModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
// import Stripe from 'stripe';
// const stripe = Stripe(
// 	'sk_test_51I7We4Kp9cF25cd34r9zc8run3zpurq5Hgw4Aah5FRHgU8RY7ZQ9Qe0Wz9nz2R2t7ecI2Qk96jqA3KCpsyJENmi700k3bz25gH'
// );

export const getAllOrders = catchAsync(async function (req, res, next) {
	const orders = await Order.find().populate('user', 'name');
	res.status(200).json({
		status: 'success',
		data: {
			orders
		}
	});
});

export const createOrder = catchAsync(async (req, res, next) => {
	let order = await Order.create({ user: req.user._id, ...req.body });

	res.status(201).json({
		status: 'success',
		data: {
			order
		}
	});
});

export const getOrder = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.orderId);
	if (!order) return next(new AppError('No order found with that ID', 404));
	res.status(200).json({
		status: 'success',
		data: {
			order
		}
	});
});

export const updateOrderToPaid = catchAsync(async (req, res, next) => {
	const order = await Order.findById(req.params.orderId);
	order.processOrder(req.body);
	const updatedOrder = await order.save();
	res.status(200).json({
		status: 'success',
		data: {
			order: updatedOrder
		}
	});
});

export const updateOrderToDelivered = catchAsync(async function (req, res, next) {
	const order = await Order.findByIdAndUpdate(
		req.params.orderId,
		{ isDelivered: true, deliveredAt: Date.now() },
		{
			new: true,
			runValidators: true
		}
	);
	if (!order) return next(new AppError('No order found with that Id', 404));
	res.status(200).json({
		status: 'success',
		data: {
			order
		}
	});
});

// export const getCheckoutSession = async (req, res, next) => {
// 	const order = await Order.findById(req.params.orderId);
// 	// const product = await stripe.products.create({
// 	// 	name: order.orderItems[0].name,
// 	// });
// 	const session = await stripe.checkout.sessions.create({
// 		mode: 'payment',
// 		payment_method_types: ['card'],
// 		success_url: `${req.protocol}://127.0.0.1:3000/orders/${req.params.orderId}`,
// 		cancel_url: `${req.protocol}://127.0.0.1:3000/`,
// 		customer_email: req.user.email,
// 		client_reference_id: req.params.orderId,
// 		line_items: order.orderItems.map((el) => {
// 			return {
// 				price_data: {
// 					currency: 'usd',
// 					product_data: {
// 						name: el.name,
// 					},
// 					unit_amount_decimal: el.price * 100,
// 				},
// 				quantity: el.quantity,
// 			};
// 		}),
// 	});
// 	res.status(200).json({
// 		status: 'success',
// 		data: {
// 			session,
// 		},
// 	});
// };

// export const chargeTest = async (req, res, next) => {
// 	const { id, amount } = req.body;
// 	try {
// 		const payment = await stripe.paymentIntents.create({
// 			amount,
// 			currency: 'USD',
// 			description: 'Delicious empanadas',
// 			payment_method: id,
// 			confirm: true,
// 		});
// 		console.log(payment);
// 		res.status(200).json({
// 			confirm: 'abc123',
// 		});
// 	} catch (err) {}
// };
