import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
	return (
		<main className="Error">
			<p>
				Houston, we have a problem. <Link to="/">Get home safely.</Link>
			</p>
		</main>
	);
};

export default Error;
