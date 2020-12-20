import AppError from '../utils/appError.js';

const globalErrorHandler = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.status = err.status || 'error';
	if(process.env.NODE_ENV === 'development')
      return sendErrorDev(err, res);
    if(err.code === 11000)
        return sendErrorProd(handleDuplicateFieldsDB(err), res);
    	sendErrorProd(err, res)
}

function sendErrorDev(err, res) {
	res.status(err.statusCode).json({
		status: err.status,
		error: err,
		message: err.message,
		stack: err.stack
	})
}

function sendErrorProd(err, res) {
	res.status(err.statusCode).json({
		status: err.status,
		message: err.message
	})
}

function handleDuplicateFieldsDB(err) {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0].replace(/['"]+/g, '');
    return new AppError(`${value} already exist`, 400);
}

export default globalErrorHandler;