import React, { useEffect, useState } from 'react';

import DataSelector from './DataSelector';
import Loading from './Loading';
import Error from './Error';

const MarsRoverPhotos = () => {
	const [date, setDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [hasResult, setHasResult] = useState(false);
	const [photos, setPhotos] = useState([]);

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

	const getRoverPhotos = async () => {
		setIsLoading(true);

		try {
			await fetch(
				`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${process.env.REACT_APP_API_KEY}`
			).then(async function (response) {
				if (response.ok) {
					const data = await response.json();
					setPhotos(data.photos);
					setHasResult(true);
					setHasError(false);
				} else {
					setHasError(true);
				}
			});
		} catch (err) {
			console.log(err);
			setHasError(true);
		} finally {
			setIsLoading(false);
		}
	};

	if (hasError) {
		return <Error />;
	}

	return (
		<main className="feature">
			<DataSelector
				instruction="Pick a date to see Rover photos taken on that day"
				date={date}
				handleDateChange={handleDateChange}
				handleSubmit={getRoverPhotos}
				dateFormatter={formatToday}
			/>

			<div className="result-container">
				{isLoading && <Loading />}

				{hasResult && !isLoading && (
					<>
						<h2>
							{photos.length} Photo{photos.length !== 1 && 's'} Found
						</h2>

						<div className="NEO-container"></div>
					</>
				)}
			</div>
		</main>
	);
};

export default MarsRoverPhotos;
