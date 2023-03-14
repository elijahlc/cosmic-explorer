import { Routes, Route } from 'react-router-dom';

import Nav from './Components/Nav';
import Home from './Components/Home';
import APoD from './Components/APoD';
import NEOs from './Components/NEOs';

import './App.css';

function App() {
	return (
		<div className="App">
			<Nav />

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/apod" element={<APoD />} />
				<Route path="/neos" element={<NEOs />} />
			</Routes>
		</div>
	);
}

export default App;
