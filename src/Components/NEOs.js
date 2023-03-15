import React, { useEffect, useState } from 'react';

import Loading from './Loading';
import Error from './Error';
import NEO from './NEO';

const NEOs = () => {
	const [date, setDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [hasResult, setHasResult] = useState(false);
	const [NEOs, setNEOs] = useState({});

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

	const getNEOs = async () => {
		setIsLoading(true);

		try {
			await fetch(
				`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&api_key=${process.env.REACT_APP_API_KEY}`
			).then(async function (response) {
				if (response.ok) {
					const data = await response.json();
					setNEOs({ ...data });
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
		<main className="feature">
			<div className="selector">
				<h1>Pick a date to see the Near-Earth Objects in the following 7-day period</h1>

				<div>
					<input type="date" value={date} onChange={handleDateChange} max={formatToday()} />
					<button onClick={getNEOs}>Get NEOs</button>
				</div>
			</div>

			<div className="result-container">
				{isLoading && <Loading />}

				{hasResult && !isLoading && (
					<>
						<h2>
							{NEOs.element_count} Object{NEOs.element_count !== 1 && 's'} Found
						</h2>

						<div className="NEO-container">
							{Object.values(NEOs.near_earth_objects).map((object) => (
								<NEO
									key={object[0].id}
									name={object[0].name}
									dangerous={object[0].is_potentially_hazardous_asteroid}
									diameter_min={object[0].estimated_diameter.meters.estimated_diameter_min}
									diameter_max={object[0].estimated_diameter.meters.estimated_diameter_max}
									closest_approach={object[0].close_approach_data[0].close_approach_date}
									miss_distance={object[0].close_approach_data[0].miss_distance.kilometers}
								/>
							))}
						</div>
					</>
				)}
			</div>
		</main>
	);
};

export default NEOs;
