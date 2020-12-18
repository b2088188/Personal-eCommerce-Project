import express from 'express';
const router = express.Router();
import {getAllProducts, createProduct} from '../controller/productController.js';

router.route('/')
           .get(getAllProducts)
           .post(createProduct)

export default router;           