import './topbar.css';
import rajeshImage from '../../assets/rajesh.jpg';
import { Link } from 'react-router-dom';

export default function topbar() {
	const user = false;
	return (
		<div className="top">
			<div className="topLeft">
				<i className="topIcon fa-brands fa-instagram"></i>
				<i className="topIcon fa-brands fa-github"></i>
			</div>
			<div className="topCenter">
				<ul className="topList">
					<li className="topListItem">
						<Link className="link" to="/">
							HOME
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/about">
							ABOUT
						</Link>
					</li>
					<li className="topListItem">
						<Link className="link" to="/contact">
							CONTACT
						</Link>
					</li>

					<li className="topListItem">
						<Link className="link" to="/write">
							WRITE
						</Link>
					</li>
					{user && <li className="topListItem">LOGOUT</li>}
				</ul>
			</div>
			<div className="topRight">
				{user ? (
					<Link className="link" to="/settings">
						<img className="topImg" src={rajeshImage} alt="" />
					</Link>
				) : (
					<ul className="topList">
						<li className="topListItem">
							<Link className="link" to="/login">
								LOGIN
							</Link>
						</li>
						<li className="topListItem">
							<Link className="link" to="/register">
								REGISTER
							</Link>
						</li>
					</ul>
				)}
				<i className="topSearchIcon fas fa-search"></i>
			</div>
		</div>
	);
}
