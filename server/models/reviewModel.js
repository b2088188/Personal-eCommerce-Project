import mongoose from 'mongoose';
import Product from '../models/productModel.js';

const reviewSchema = new mongoose.Schema({
	review: {
		type: String,
		required: [true, 'Review cannot be empty']
	},
	rating: {
		type: Number,
		required: [true, 'Rating cannot be empty'],
		min: [1, 'Rating must be above 1.0'],
        max: [5, 'Ratings must be below 5.0']
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'A review must belong to an user']
	},
	product: {
		type: mongoose.Schema.ObjectId,
		ref: 'Product',
		required: [true, 'A review must belong to a product']
	},
	createdAt: {
		type: Date,
		default: Date.now()
	}
})

reviewSchema.statics.calcAverageRatings = async function (productId) {
	const stats = await this.aggregate([
	{$match: {product: productId}},
	{
		$group: {
			_id: '$product',
			nRating: {$sum: 1},
			avgRating: {$avg: '$rating'}
		}
	}
	])
	await Product.findByIdAndUpdate(productId, {
		ratingsQuantity: stats[0].nRating,
		ratingsAverage: stats[0].avgRating
	})
	
}

reviewSchema.post('save', function () {
	this.constructor.calcAverageRatings(this.product);
})


const Review = mongoose.model('Review', reviewSchema);
export default Review;