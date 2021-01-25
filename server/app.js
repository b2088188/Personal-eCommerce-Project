import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';

const app = express();
app.enable('trust proxy');
app.use(
	cors({
		origin: 'https://app0529-43866.web.app',
		credentials: true
	})
);
app.options(
	'*',
	cors({
		origin: 'https://app0529-43866.web.app',
		credentials: true
	})
);
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', 'https://app0529-43866.web.app');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.use(compression());

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'server/public')));

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
	});
});

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

export default app;
