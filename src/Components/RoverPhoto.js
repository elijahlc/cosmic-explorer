import React from 'react';

const RoverPhoto = ({ rover_name, camera, photo_url }) => {
	return (
		<div className="RoverPhoto">
			<h3>
				{rover_name} {camera}
			</h3>
			<img src={photo_url} alt={`${rover_name} ${camera}`} />
		</div>
	);
};

export default RoverPhoto;
