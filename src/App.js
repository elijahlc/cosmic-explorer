import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Nav from './Components/Nav';
import Home from './Components/Home';
import Feature from './Components/Feature';

import './App.css';

function App() {
	useEffect(() => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	}, []);

	return (
		<div className="App">
			<Nav />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/apod"
					element={
						<Feature
							featureName="APoD"
							instruction="Pick a date to see a picture"
							endpoint="https://api.nasa.gov/planetary/apod?date"
						/>
					}
				/>

				<Route
					path="/neos"
					element={
						<Feature
							featureName="NEOs"
							instruction="Pick a date to see Near Earth Objects in the following 7-day period"
							endpoint="https://api.nasa.gov/neo/rest/v1/feed?start_date"
						/>
					}
				/>

				<Route
					path="/roverphotos"
					element={
						<Feature
							featureName="RoverPhotos"
							instruction="Pick a date to see Rover photos taken on that day"
							endpoint="https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date"
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
