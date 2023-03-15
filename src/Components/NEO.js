import React from 'react';

const NEO = ({ name, dangerous, diameter_min, diameter_max, closest_approach, miss_distance }) => {
	return (
		<div className="NEO">
			<span className="asteroid">☄️</span>

			<h3>{name}</h3>

			<p>
				Estimated diameter between {Math.round(diameter_min)} and {Math.round(diameter_max)} meters
			</p>

			<p>
				Closest approach on {closest_approach} and missing Earth by {Math.round(miss_distance)} kilometers
			</p>

			<p>{dangerous ? '😰 Potentially hazardous' : '👍 Not dangerous'}</p>
		</div>
	);
};

export default NEO;
