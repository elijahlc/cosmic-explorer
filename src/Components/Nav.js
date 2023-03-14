import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<nav>
			<Link>Home</Link>
			<Link>Astronomy Picture of the Day</Link>
			<Link>Near Earth Objects</Link>
		</nav>
	);
};

export default Nav;
