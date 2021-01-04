import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

import globalErrorHandler from './controller/errorController.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';

app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/reviews', reviewRouter);
app.get('/api/v1/config/paypal', (req, res) => {
	res.status(200).json({
		status: 'success',
		data: {
			clientId: process.env.PAYPAL_CLIENT_ID
		}
	})
})

app.use(globalErrorHandler);

export default app;