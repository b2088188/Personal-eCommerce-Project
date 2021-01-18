import multer from 'multer';
import sharp from 'sharp';
import Product from '../models/productModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import APIFeatures from '../utils/apiFeatures.js';

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) return cb(null, true);
	cb(new AppError('Not an image, only allowing to upload an image', 400), false);
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter
});

export const uploadProductImage = upload.single('image');

export const resizeProductImage = catchAsync(async (req, res, next) => {
	if (!req.file) return next();
	req.file.filename = `product-${Date.now()}.jpeg`;
	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`server/public/images/products/${req.file.filename}`);
	next();
});

export const getAllProducts = catchAsync(async (req, res, next) => {
	const features = new APIFeatures(Product.find(), req.query).paginate();
	const products = await features.query;
	res.status(200).json({
		status: 'success',
		data: {
			products
		}
	});
});

export const getProduct = catchAsync(async (req, res, next) => {
	const product = await Product.findById(req.params.productId);
	if (!product) return next(new AppError('No product found with that Id', 404));
	res.status(200).json({
		status: 'success',
		data: {
			product
		}
	});
});

export const createProduct = catchAsync(async (req, res, next) => {
	if (req.file) req.body.image = `images/products/${req.file.filename}`;
	console.log(req.body);
	const product = await Product.create({ user: req.user._id, ...req.body }, { new: true });
	console.log(product);
	res.status(201).json({
		status: 'success',
		data: {
			product
		}
	});
});

export const updateProduct = catchAsync(async (req, res, next) => {
	if (req.file) req.body.image = `images/products/${req.file.filename}`;
	console.log(req.body);
	const product = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
	if (!product) return next(new AppError('No product found with that Id', 404));
	res.status(200).json({
		status: 'success',
		data: {
			product
		}
	});
});

export const deleteProduct = catchAsync(async function (req, res, next) {
	const product = await Product.findByIdAndDelete(req.params.productId);
	if (!product) return next(new AppError('No product found with that Id', 404));
	res.status(204).json({
		status: 'success'
	});
});
