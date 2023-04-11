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
				<Route path="/:feature" element={<Feature />} />
			</Routes>
		</div>
	);
}

export default App;
