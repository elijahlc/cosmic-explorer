import { Routes, Route } from 'react-router-dom';

import Nav from './Components/Nav';
import Home from './Components/Home';

import './App.css';

function App() {
	return (
		<div className="App">
			<Nav />

			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
