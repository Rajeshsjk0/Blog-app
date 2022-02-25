import './post.css';
import { Link } from 'react-router-dom';

export default function Post({ post }) {
	return (
		<div className="post">
			{post.photo && <img className="postImg" src={post.photo} alt="" />}

			<div className="postInfo">
				<div className="postCategories">
					{post.categories.map((c, i) => (
						<span key={i} className="postCat">
							{c.name}
						</span>
					))}
				</div>
				<Link to={`/post/${post._id}`}>
					<span className="postTitle">{post.title}</span>
				</Link>
				<hr />
				<span className="postDate">
					{new Date(post.createdAt).toDateString()}
				</span>
				<span className="postDesc">{post.desc}</span>
			</div>
		</div>
	);
}
