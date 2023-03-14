import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav className="Nav">
			<Link to="/">Home</Link>
			<Link to="/apod">Astronomy Picture of the Day</Link>
			<Link to="/neos">Near Earth Objects</Link>
		</nav>
	);
};

export default Nav;
