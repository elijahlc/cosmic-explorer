import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DataSelector from './DataSelector';
import Loading from './Loading';
import Error from './Error';

import APoDResult from './APoDResult';
import NEO from './NEO';
import RoverPhoto from './RoverPhoto';

const Feature = () => {
	const [date, setDate] = useState('');
	const [featureConfig, setFeatureConfig] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [hasResult, setHasResult] = useState(false);
	const [data, setData] = useState({});

	const { feature } = useParams();

	useEffect(() => {
		setDate(formatToday());
	}, []);

	useEffect(() => {
		setIsLoading(true);

		if (feature === 'apod') {
			setFeatureConfig({
				name: 'APoD',
				instruction: 'Pick a date to see a picture',
				endpoint: 'https://api.nasa.gov/planetary/apod?date',
			});
		}

		if (feature === 'neos') {
			setFeatureConfig({
				name: 'NEOs',
				instruction: 'Pick a date to see Near Earth Objects in the following 7-day period',
				endpoint: 'https://api.nasa.gov/neo/rest/v1/feed?start_date',
			});
		}

		if (feature === 'roverphotos') {
			setFeatureConfig({
				name: 'RoverPhotos',
				instruction: 'Pick a date to see Rover photos taken on that day',
				endpoint: 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date',
			});
		}

		setData({});
		setHasError(false);
		setHasResult(false);

		setIsLoading(false);
	}, [feature]);

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
			await fetch(`${featureConfig.endpoint}=${date}&api_key=${process.env.REACT_APP_API_KEY}`).then(async function (
				response
			) {
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
				instruction={featureConfig.instruction}
				date={date}
				handleDateChange={handleDateChange}
				handleSubmit={getData}
				dateFormatter={formatToday}
			/>

			<div className="Feature-result-container">
				{isLoading && <Loading />}

				{hasResult && !isLoading && featureConfig.name === 'APoD' && <APoDResult {...data} />}

				{hasResult && !isLoading && featureConfig.name === 'NEOs' && (
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

				{hasResult && !isLoading && featureConfig.name === 'RoverPhotos' && (
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
