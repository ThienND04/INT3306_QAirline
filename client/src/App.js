import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './user/views/pages/Home';
import FlightSearch from './user/views/pages/FlightSearch';
import Login from './user/views/pages/Login';
import ForgotPassword from './user/views/pages/ForgotPassword';
import Register from './user/views/pages/Register';
import AdminHome from './admin/components/views/pages/AdminHome';
import FlightsManager from './admin/components/views/pages/FlightManager/FlightsManager';
import CreateFlight from './admin/components/views/pages/FlightManager/CreateFlight';
import EditFlight from './admin/components/views/pages/FlightManager/EditFlight';
import AirportManager from './admin/components/views/pages/AirportManager/AirportsManager';
import CreateAirport from './admin/components/views/pages/AirportManager/CreateAirport';
import EditAirport from './admin/components/views/pages/AirportManager/EditAirport';


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
				<Route path="/admin/add-flight" element={<CreateFlight />} />
				<Route path="/admin/edit-flight/:id" element={< EditFlight />} />
				<Route path="/admin/airports" element={< AirportManager />} />
				<Route path="/admin/add-airport" element={< CreateAirport />} />
				<Route path="/admin/edit-airport/:id" element={< EditAirport />} />
			</Routes>
		</Router>
	);
}
export default App;
