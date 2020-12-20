import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
   name: {
   	type: String,
   	required: [true, 'Please provide your name']
   },
   email: {
   	type: String,
   	required: [true, 'Please provide your email'],
   	unique: true,
   	lowercase: true,
   	validate: [validator.isEmail, 'Please provide a valid email']
   },
   password: {
   	type: String,
   	required: [true, 'Please provide your password'],
   	minLength: 8,
   	select: false
   },
   passwordConfirm: {
   	type: String,
   	required: [true, 'Please confirm your password'],
   	validate: {
   		validator: function (el) {
   			return el === this.password;
   		},
   		message: 'Passwords are not the same'
   	}
   },
   role: {
   	type: String,
   	enum: ['user', 'admin'],
   	default: 'user'
   }
});

userSchema.pre('save', async function (next) {
	if(!this.isModified('password'))
		return next();
	this.password = await bcrypt.hash(this.password, 12);
	this.passwordConfirm = undefined;
	next();
});

userSchema.methods.comparePassword = async function (reqPassword) {
   return await bcrypt.compare(reqPassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;