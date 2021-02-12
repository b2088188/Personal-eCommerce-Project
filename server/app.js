import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';

const app = express();
app.use(helmet());
// app.enable('trust proxy');
// app.use(
// 	cors({
// 		origin: 'https://app0746-9a789.web.app',
// 		credentials: true
// 	})
// );
// app.options('*', cors());
// app.use(function (req, res, next) {
// 	res.header('Access-Control-Allow-Origin', 'https://app0746-9a789.web.app');
// 	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
// 	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
// 	res.header('Access-Control-Allow-Credentials', true);
// 	next();
// });

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
// app.use(compression());
app.use(mongoSanitize());
app.use(xss());
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
