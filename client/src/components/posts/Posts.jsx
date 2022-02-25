import Post from '../post/Post';
import './posts.css';

export default function Posts({ posts }) {
	/* console.log(posts);
	const postData = posts.length > 0 && posts.map((post) => <li>{post}</li>); */
	return (
		<div className="posts">
			{posts.map((p, i) => (
				<Post key={i} post={p} />
			))}
		</div>
	);
}
