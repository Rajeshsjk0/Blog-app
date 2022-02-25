import './singlepost.css';
//import singlePost from '../../assets/singlepost.jpg';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function SinglePost() {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [post, setPost] = useState([]);

	useEffect(() => {
		const getPost = async () => {
			const response = await fetch('/posts/' + path);
			const data = await response.json();
			setPost(data);
		};
		getPost();
	}, [path]);

	return (
		<div className="singlePost">
			<div className="singlePostWrapper">
				{post.photo && (
					<img className="singlePostImg" src={post.photo} alt="" />
				)}
			</div>
			<h1 className="singlePostTitle">
				{post.title}
				<div className="singlePostEdit">
					<i className="singlePostIcon fa-solid fa-pen-to-square"></i>
					<i className="singlePostIcon fa-solid fa-trash-can"></i>
				</div>
			</h1>
			<div className="singlePostInfo">
				<span className="singlePostAuthor">
					Author:
					<Link to={`/?user=${post.username}`}>
						<b> {post.username} </b>
					</Link>
				</span>
				<span className="singlePostDate">
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className="singlePostDesc">{post.desc}</p>
		</div>
	);
}
