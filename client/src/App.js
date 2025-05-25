import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './user/views/pages/Home';
import FlightSearch from './user/views/pages/FlightSearch';
import Login from './user/views/pages/Login';
import ForgotPassword from './user/views/pages/ForgotPassword';
import Register from './user/views/pages/Register';
import AdminHome from './admin/components/views/pages/AdminHome';
import FlightsManager from './admin/components/views/pages/FlightsManager';


function App() {
	return (
		<Router>
			<Routes>
				{/* Routes for user */}
				<Route path="/" element={<Home />} />
				<Route path="/flights" element={<FlightSearch />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />

				{/* Routes for admin */}
				<Route path="/admin" element={<AdminHome />} />
				<Route path="/admin/flights" element={<FlightsManager />} />
			</Routes>
		</Router>
	);
}
export default App;
