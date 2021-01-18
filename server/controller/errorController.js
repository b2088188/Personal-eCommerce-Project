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
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
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

export default globalErrorHandler;
