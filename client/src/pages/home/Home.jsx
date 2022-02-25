import './home.css';
import { useState, useEffect } from 'react';
import Header from '../../components/header/Header';
import Posts from '../../components/posts/Posts';
import SideBar from '../../components/sidebar/SideBar';
import { useLocation } from 'react-router-dom';

export default function Home() {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();

	useEffect(() => {
		async function fetchPosts() {
			const response = await fetch('posts' + search);
			const data = await response.json();
			setPosts(data);
		}
		fetchPosts();
	}, [search]);

	return (
		<>
			<Header />
			<div className="home">
				<Posts posts={posts} />
				<SideBar />
			</div>
		</>
	);
}
