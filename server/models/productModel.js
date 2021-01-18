import mongoose from 'mongoose';
import validator from 'validator';

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A product must have a name']
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'A product must belong to an user']
	},
	image: {
		type: String,
		default: 'images/products/sample.jpg'
	},
	brand: {
		type: String,
		required: [true, 'A product must have a brand name']
	},
	category: {
		type: String,
		enum: ['Electronics'],
		required: [true, 'A product must have a category']
	},
	description: {
		type: String,
		required: [true, 'A product must have a description']
	},
	ratingsAverage: {
		type: Number,
		min: [1, 'Rating must be above 1.0'],
		max: [5, 'Rating must be below 5.0'],
		default: 3.5
	},
	ratingsQuantity: {
		type: Number,
		default: 0
	},
	price: {
		type: Number,
		required: [true, 'A product must have a price']
	},
	countInStock: {
		type: Number,
		required: [true, 'A product must have amount of stock'],
		default: 1
	}
});

const Product = mongoose.model('Product', productSchema);

export default Product;
