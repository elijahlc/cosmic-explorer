import React, { useEffect, useState } from 'react';

import DataSelector from './DataSelector';
import Loading from './Loading';
import Error from './Error';

import APoDResult from './APoDResult';
import NEO from './NEO';
import RoverPhoto from './RoverPhoto';

const Feature = ({ featureName, instruction, endpoint }) => {
	const [date, setDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [hasResult, setHasResult] = useState(false);
	const [data, setData] = useState({});

	useEffect(() => {
		setDate(formatToday());
	}, []);

	const formatToday = () => {
		const today = new Date();

		const options = {
			month: '2-digit',
		};

		return `${today.getFullYear()}-${today.toLocaleString('en', options)}-${today.getDate()}`;
	};

	const handleDateChange = (e) => {
		setDate(e.target.value);
	};

	const getData = async () => {
		setIsLoading(true);

		try {
			await fetch(`${endpoint}=${date}&api_key=${process.env.REACT_APP_API_KEY}`).then(async function (response) {
				if (response.ok) {
					const data = await response.json();
					setData({ ...data });
					setHasResult(true);
					setHasError(false);
				} else {
					setHasError(true);
				}
			});
		} catch (err) {
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	if (hasError) {
		return <Error />;
	}

	return (
		<main className="Feature">
			<DataSelector
				instruction={instruction}
				date={date}
				handleDateChange={handleDateChange}
				handleSubmit={getData}
				dateFormatter={formatToday}
			/>

			<div className="Feature-result-container">
				{isLoading && <Loading />}

				{hasResult && !isLoading && featureName === 'APoD' && <APoDResult {...data} />}

				{hasResult && !isLoading && featureName === 'NEOs' && (
					<>
						<h2>
							{data.element_count} Object{data.element_count !== 1 && 's'} Found
						</h2>

						<div className="NEO-container">
							{Object.values(data.near_earth_objects).map((objectsOnDate) =>
								objectsOnDate.map((object) => {
									return (
										<NEO
											key={object.id}
											name={object.name}
											dangerous={object.is_potentially_hazardous_asteroid}
											diameter_min={object.estimated_diameter.meters.estimated_diameter_min}
											diameter_max={object.estimated_diameter.meters.estimated_diameter_max}
											closest_approach={object.close_approach_data[0].close_approach_date}
											miss_distance={object.close_approach_data[0].miss_distance.kilometers}
										/>
									);
								})
							)}
						</div>
					</>
				)}

				{hasResult && !isLoading && featureName === 'RoverPhotos' && (
					<>
						<h2>
							{data.photos.length} Photo{data.photos.length !== 1 && 's'} Found
						</h2>

						<div className="RoverPhotos-container">
							{data.photos.map((photo) => (
								<RoverPhoto
									rover_name={photo.rover.name}
									camera={photo.camera.full_name}
									photo_url={photo.img_src}
									key={photo.id}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</main>
	);
};

export default Feature;