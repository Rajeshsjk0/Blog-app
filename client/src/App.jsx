import TopBar from './components/topbar/TopBar';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Homepage from './pages/home/Home';
import Settings from './pages/settings/Settings';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
	const currentUser = false;
	return (
		<Router>
			<TopBar />
			<Switch>
				<Route exact path="/">
					<Homepage />
				</Route>
				<Route path="/posts">
					<Homepage />
				</Route>
				<Route path="/about">
					<About />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
				<Route path="/register">
					{currentUser ? <Homepage /> : <Register />}
				</Route>
				<Route path="/login">{currentUser ? <Homepage /> : <Login />}</Route>
				<Route path="/post/:id">
					<Single />
				</Route>
				<Route path="/write">{currentUser ? <Write /> : <Login />}</Route>
				<Route path="/settings">{currentUser ? <Settings /> : <Login />}</Route>
			</Switch>
		</Router>
	);
}

export default App;
