import AppError from '../utils/appError.js';

const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if (process.env.NODE_ENV === 'development') return sendErrorDev(err, req, res);
	let error = { ...err };
	error.message = err.message;
	error.errmsg = err.errmsg;
	error.name = err.name;
	if (error.code === 11000) error = handleDuplicateFieldsDB(error);
	if (error.name === 'CastError') error = handleCastErrorDB(error);
	if (error.name === 'ValidationError') error = handleValidationErrorDB(error);
	if (error.name === 'JsonWebTokenError') error = handleJWTError();
	if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
	sendErrorProd(error, req, res);
};

function sendErrorDev(err, req, res) {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	});
}

function sendErrorProd(err, req, res) {
	if (err.isOperational)
		return res.status(err.statusCode).json({
			status: err.status,
			message: err.message
		});
	res.status(500).json({
		status: 'error',
		message: 'Something went very wrong!'
	});
}

function handleCastErrorDB(err) {
	const message = `Invalid ${err.path}: ${err.value}.`;
	return new AppError(message, 400);
}

function handleDuplicateFieldsDB(err) {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0].replace(/['"]+/g, '');
	return new AppError(`${value} already exist`, 400);
}

function handleValidationErrorDB(err) {
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data. ${errors.join('. ')}`;
	return new AppError(message, 400);
}

function handleJWTError() {
	return new AppError('Invalid token. Please log in again.', 401);
}

function handleJWTExpiredError() {
	return new AppError('Token is expired. Please login again', 401);
}

export default globalErrorHandler;
