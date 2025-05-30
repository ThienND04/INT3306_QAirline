import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './user/views/pages/Home';
import FlightSearch from './user/views/pages/FlightSearch';
import Login from './user/views/pages/Login';
import ForgotPassword from './user/views/pages/ForgotPassword';
import Register from './user/views/pages/Register';
import AdminHome from './admin/views/pages/AdminHome';
import FlightsManager from './admin/views/pages/FlightManager/FlightsManager';
import CreateFlight from './admin/views/pages/FlightManager/CreateFlight';
import EditFlight from './admin/views/pages/FlightManager/EditFlight';
import AirportManager from './admin/views/pages/AirportManager/AirportsManager';
import CreateAirport from './admin/views/pages/AirportManager/CreateAirport';
import EditAirport from './admin/views/pages/AirportManager/EditAirport';
import DeletedAirportsManager from './admin/views/pages/AirportManager/DeletedAirportsManager';


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
				<Route path="/admin/airports/add-airport" element={< CreateAirport />} />
				<Route path="/admin/airports/edit-airport/:id" element={< EditAirport />} />
				<Route path="/admin/airports/deleted" element={< DeletedAirportsManager />} />
			</Routes>
		</Router>
	);
}
export default App;
