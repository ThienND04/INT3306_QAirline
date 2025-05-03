import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/pages/Home';
import FlightSearch from './views/pages/FlightSearch';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/flights" element={<FlightSearch />} />
				{/* Thêm các route khác như /booking, /admin, v.v */}
			</Routes>
		</Router>
	);
}
export default App;
