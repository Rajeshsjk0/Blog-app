import './sidebar.css';
import rajeshImage from '../../assets/rajesh.jpg';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SideBar() {
	const [cats, setCats] = useState([]);
	useEffect(() => {
		const getCats = async () => {
			const response = await fetch('/categories');
			const data = await response.json();
			setCats(data);
		};
		getCats();
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebarItem">
				<span className="sidebarTitle">About Me</span>
				<img src={rajeshImage} alt="" />
				<p>
					This is my simple blog website created using mern stack here you can
					read and write many blogs.
				</p>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">Categories</span>
				<ul className="sidebarList">
					{cats.map((c) => (
						<li key={c._id} className="sidebarListItem">
							<Link to={`/?cat=${c.name}`}>{c.name}</Link>
						</li>
					))}
				</ul>
			</div>
			<div className="sidebarItem">
				<span className="sidebarTitle">Follow Us</span>
				<div className="sidebarSocial">
					<i className="sidebarIcon fa-brands fa-instagram"></i>
					<i className="sidebarIcon fa-brands fa-github"></i>
				</div>
			</div>
		</div>
	);
}
