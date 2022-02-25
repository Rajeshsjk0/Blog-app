const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('./../models/User');
const Post = require('./../models/Post');
const auth = require('./../middleware/authetication');

const router = express.Router();

//register
router.post('/register', async (req, res) => {
	try {
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});
		const user = await newUser.save();
		const token = await user.generateAuthToken();
		user.password = undefined;
		user.tokens = undefined;
		res.status(200).json({ user, token });
	} catch (err) {
		res.status(500).json(err);
	}
});
//login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw 'Please provide email and password!';
		}
		const user = await User.findOne({ email }).select('+password');
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw 'password or email is not correct';
		}
		const token = await user.generateAuthToken();
		user.password = undefined;
		user.tokens = undefined;
		res.status(200).json({ user, token });
	} catch (error) {
		res.status(400).json(error);
	}
});

router.get('/me', auth, async (req, res) => {
	console.log(req.user);
	res.send(req.user);
});

//update
router.patch('/:id', auth, async (req, res) => {
	try {
		if (req.body.password) {
			const salt = await bcrypt.genSalt(10);
			req.body.password = await bcrypt.hash(req.body.password, salt);
		}
		id = req.params.id;
		const updatedUser = await User.findByIdAndUpdate(
			id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		updatedUser.tokens = undefined;
		res.status(200).json(updatedUser);
	} catch (err) {
		res.status(500).json(err);
	}
});

//delete
router.delete('/delete', auth, async (req, res) => {
	try {
		await req.user.remove();
		await Post.deleteMany({ username: req.user.username });
		res.status(201).json('user has been deleted');
	} catch (e) {
		res.status(500).send();
	}
});

module.exports = router;
