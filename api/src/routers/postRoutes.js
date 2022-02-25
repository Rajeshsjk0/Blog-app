const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('./../middleware/authetication');

//CREATE new POST
router.post('/', auth, async (req, res) => {
	const newPost = new Post(req.body);
	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//UPDATE POST
router.patch('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			throw new Error('post is not present');
		}
		const updatedPost = await Post.findByIdAndUpdate(
			req.params.id,
			{
				$set: req.body,
			},
			{ new: true }
		);
		res.status(200).json(updatedPost);
	} catch (err) {
		res.status(500).json(err);
	}
});

//DELETE POST
router.delete('/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			throw new Error('post is not present');
		}
		await post.delete();
		res.status(200).json('Post has been deleted...');
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET POST
router.get('/:id', async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET ALL POSTS
router.get('/', async (req, res) => {
	const username = req.query.user;
	const catName = req.query.cat;
	try {
		let posts;
		if (username) {
			posts = await Post.find({ username });
		} else if (catName) {
			/* let posts = [];
			if (catName.length <= 1) {
				posts = await Post.find({ catName });
			} else {
				catName.map((cat) => posts.push(await Post.find({ catName })));
			} */
			posts = await Post.find({
				categories: {
					$in: [catName],
				},
			});
		} else {
			posts = await Post.find();
		}
		res.status(200).json(posts);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
