import './header.css';
//import compImage from '../../assets/comp.jpeg';

export default function Header() {
	return (
		<div className="header">
			<div className="headerTitles ">
				{/* <span className="headerTitleSm">React & Node</span> */}
				<span className="headerTitleLg">Blog-App</span>
			</div>
			{/* <img className="headerImg" src={compImage} alt="comp" /> */}
		</div>
	);
}
