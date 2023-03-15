import React, { useEffect, useState } from 'react';

import Loading from './Loading';
import Error from './Error';
import APoDResult from './APoDResult';

const APoD = () => {
	const [date, setDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [hasResult, setHasResult] = useState(false);
	const [APoD, setAPoD] = useState({});

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

	const getAPoD = async () => {
		setIsLoading(true);

		try {
			await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${process.env.REACT_APP_API_KEY}`).then(
				async function (response) {
					if (response.ok) {
						const data = await response.json();
						setAPoD({ ...data });
						setHasResult(true);
						setHasError(false);
					} else {
						setHasError(true);
					}
				}
			);
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
				<h1>Pick a date to see a picture</h1>

				<div>
					<input type="date" value={date} onChange={handleDateChange} max={formatToday()} />
					<button onClick={getAPoD}>Get APoD</button>
				</div>
			</div>

			<div className="result-container">
				{isLoading && <Loading />}

				{hasResult && !isLoading && <APoDResult {...APoD} />}
			</div>
		</main>
	);
};

export default APoD;
