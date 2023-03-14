import React, { useEffect, useState } from 'react';

import APoDResult from './APoDResult';

const APoD = () => {
	const [date, setDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [hasResult, setHasResult] = useState(false);
	const [result, setResult] = useState({});

	useEffect(() => {
		console.log(formatToday());
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
						setResult({ ...data });
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

	return (
		<div className="APoD">
			<>
				<h1>Pick a date</h1>
				<input type="date" value={date} onChange={handleDateChange} max={formatToday()} />
				<button onClick={getAPoD}>Get APoD</button>
			</>

			{isLoading && <div>Searching the cosmos</div>}

			{hasError && <div>An error has occurred</div>}

			{hasResult && <APoDResult {...result} />}
		</div>
	);
};

export default APoD;
