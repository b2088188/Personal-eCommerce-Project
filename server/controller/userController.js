import User from '../models/userModel.js';
import Order from '../models/orderModel.js';
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

export const updateUserProfile = catchAsync(async (req, res, next) => {
    if(req.body.password || req.body.passwordConfirm)
      return next(new AppError('This route is not for password updates. Please use /updatePassword', 400));
    let filterBody = filterObj(req.body, 'name', 'email');
    let user = await User.findByIdAndUpdate(req.user._id, filterBody);
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    })
});

const filterObj = (obj, ...allowedFields) => {
  return Object.keys(obj).reduce((acc, cur) => {
    if(allowedFields.includes(cur))
      return {...acc, [cur]: obj[cur]};
    return acc;
  }, {})
}

export const getUserOrders = catchAsync(async (req, res, next) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json({
      status: 'success',
      data: {
        orders
      }
    })
});