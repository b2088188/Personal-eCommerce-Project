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


app.use('/api/v1/products', productRouter);
app.use('/api/v1/users', userRouter);

app.use(globalErrorHandler);

export default app;