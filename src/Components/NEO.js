import React from 'react';

const NEO = ({ name, dangerous, diameter_min, diameter_max, closest_approach, miss_distance }) => {
	return (
		<div>
			<p>{name}</p>
			<p>
				Estimated size: between {Math.round(diameter_min)} and {Math.round(diameter_max)} meters
			</p>
			<p>
				Closest approach on {closest_approach} and missing Earth by {Math.round(miss_distance)} kilometers
			</p>
		</div>
	);
};

export default NEO;
