import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

export const signup = catchAsync(async (req, res, next) => {
   const user = await User.create(req.body);
   createSendToken(user, 201, res);
});

function createSendToken(user, statusCode, res) {
   const token = signToken(user._id);
   const cookieOptions = {
      expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      httpOnly: true
      //secure: true,
      //sameSite: 'None'
   };
   res.cookie('jwt', token, cookieOptions);
   user.password = undefined;
   res.status(statusCode).json({
      status: 'success',
      data: {
         token,
         user
      }
   });
}

function signToken(id) {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
   });
}

export const login = catchAsync(async (req, res, next) => {
   const { email, password } = req.body;
   if (!email || !password) return next(new AppError('Please provide email and password', 400));
   const user = await User.findOne({ email }).select('+password');
   if (!user || !(await user.comparePassword(password)))
      return next(new AppError('Incorrect email or password', 401));
   createSendToken(user, 200, res);
});

export const isLoggedIn = catchAsync(async function (req, res, next) {
   let token;
   if (req.cookies.jwt) token = req.cookies.jwt;
   if (!token) return next(new AppError('', 401));
   const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
   const currentUser = await User.findById(decoded.id);
   if (!currentUser) return next(new AppError('', 401));
   res.status(200).json({
      status: 'success',
      data: {
         user: currentUser
      }
   });
});

export const logout = (req, res) => {
   res.cookie('jwt', 'Logged Out', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
      //secure: true,
      //sameSite: 'None'
   });
   res.status(200).json({
      status: 'success'
   });
};

export const protect = catchAsync(async (req, res, next) => {
   let token;
   if (req.cookies.jwt) token = req.cookies.jwt;
   if (!token) return next(new AppError('You are not logged in, please log in to get access', 401));
   const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
   const user = await User.findById(decoded.id);
   if (!user)
      return next(new AppError('The user belonging to this token does no longer exist', 401));
   req.user = user;
   next();
});

export const restrictTo = (...roles) => (req, res, next) => {
   if (!roles.includes(req.user.role))
      return next(new AppError('You do not have permission to perform this action', 403));
   return next();
};
