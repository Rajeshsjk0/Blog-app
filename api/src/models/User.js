const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: './src/config.env' });

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please tell us your name!'],
			unique: true,
		},
		email: {
			type: String,
			required: [true, 'Please provide your email!'],
			unique: true,
			lowercase: true,
			//validate: [validator.isEmail, 'Please provide a valid email'],
			validate(value) {
				if (
					value.toLowerCase().includes('.org') ||
					!value.toLowerCase().includes('@')
				) {
					throw new Error('email id is not valid');
				}
			},
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minlength: 8,
			select: false,
			unique: true,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('Password cannot contain "password"');
				}
			},
		},
		profilePic: {
			type: String,
			default: '',
		},
		tokens: [
			{
				token: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

userSchema.methods.generateAuthToken = async function () {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});

	user.tokens = user.tokens.concat({ token });
	await user.save();
	return token;
};

userSchema.pre('save', async function (next) {
	const user = this;
	// Hash the password with cost of 12
	const salt = await bcrypt.genSalt(10);
	if (user.isModified('password')) {
		this.password = await bcrypt.hash(this.password, salt);
	}
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
