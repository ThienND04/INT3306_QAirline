import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/pages/Home';
import FlightSearch from './views/pages/FlightSearch';
import Login from './views/pages/Login';
import ForgotPassword from './views/pages/ForgotPassword';
import Register from './views/pages/Register';


function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/flights" element={<FlightSearch />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</Router>
	);
}
export default App;
