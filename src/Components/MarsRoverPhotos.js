import React, { useEffect, useState } from 'react';

import DataSelector from './DataSelector';
import Loading from './Loading';
import Error from './Error';

const MarsRoverPhotos = () => {
	const [date, setDate] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [hasError, setHasError] = useState(false);
	const [hasResult, setHasResult] = useState(false);

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

	if (hasError) {
		return <Error />;
	}

	return <main className="feature"></main>;
};

export default MarsRoverPhotos;
