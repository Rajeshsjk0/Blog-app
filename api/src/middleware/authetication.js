const User = require('./../models/User');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config({ path: './../config.env' });

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
			_id: decoded._id,
			'tokens.token': token,
		});

		if (!user) {
			throw new Error();
		}

		req.token = token;

		req.user = user;
		req.user.email = undefined;
		req.user.tokens = undefined;
		req.user.updatedAt = undefined;
		req.user.createdAt = undefined;
		req.user.__v = undefined;
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate.' });
	}
};

module.exports = auth;
