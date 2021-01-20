import Review from '../models/reviewModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const createReviewToProduct = catchAsync(async (req, res, next) => {
	let review = new Review({ ...req.body, user: req.user._id, product: req.params.productId });
	review = await review.save(function (err, review) {
		review.populate({ path: 'user' }, function (err, review) {
			res.status(201).json({
				status: 'success',
				data: {
					review
				}
			});
		});
	});
});

export const getReviewForProduct = catchAsync(async (req, res, next) => {
	const reviews = await Review.find({ product: req.params.productId }).populate({
		path: 'user',
		select: 'name'
	});
	return res.status(200).json({
		status: 'success',
		data: {
			reviews
		}
	});
});
