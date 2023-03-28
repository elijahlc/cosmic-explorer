import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Nav from './Components/Nav';
import Home from './Components/Home';
import APoD from './Components/APoD';
import NEOs from './Components/NEOs';
import MarsRoverPhotos from './Components/MarsRoverPhotos';

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
				<Route path="/apod" element={<APoD />} />
				<Route path="/neos" element={<NEOs />} />
				<Route path="/roverphotos" element={<MarsRoverPhotos />} />
			</Routes>
		</div>
	);
}

export default App;
