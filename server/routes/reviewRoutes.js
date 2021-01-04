import express from 'express';
const router = express.Router({mergeParams: true});
import {createReviewToProduct, getReviewForProduct} from '../controller/reviewController.js';
import {protect, restrictTo} from '../controller/authController.js';


// Url: /api/v1/products/dh912e791e/reviews
router.route('/')
			.post(protect, restrictTo('user'), createReviewToProduct)
			.get(getReviewForProduct)


export default router;