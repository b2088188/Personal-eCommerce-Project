import User from '../models/userModel.js';
import catchAsync from'../utils/catchAsync.js';
import AppError from '../utils/appError.js';

export const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if(!user)
  	return next(new AppError('No user found with that Id', 404));
  res.status(200).json({
  	status: 'success',
  	data: {
  		user
  	}
  })
});