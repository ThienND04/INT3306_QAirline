import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./user/views/pages/Home";
import FlightSearch from "./user/views/pages/FlightSearch";
import Login from "./user/views/pages/Login";
import ForgotPassword from "./user/views/pages/ForgotPassword";
import Register from "./user/views/pages/Register";
import AdminHome from "./admin/views/pages/AdminHome";
import FlightsManager from "./admin/views/pages/FlightManager/FlightsManager";
import CreateFlight from "./admin/views/pages/FlightManager/CreateFlight";
import EditFlight from "./admin/views/pages/FlightManager/EditFlight";
import AirportManager from "./admin/views/pages/AirportManager/AirportsManager";
import CreateAirport from "./admin/views/pages/AirportManager/CreateAirport";
import EditAirport from "./admin/views/pages/AirportManager/EditAirport";
import DeletedAirportsManager from "./admin/views/pages/AirportManager/DeletedAirportsManager";
import AircraftManager from "./admin/views/pages/AircraftManager/AircraftManager";
import CreateAircraft from "./admin/views/pages/AircraftManager/CreateAircraft";
import EditAircraft from "./admin/views/pages/AircraftManager/EditAircraft";
import DeletedFlightsManager from "./admin/views/pages/FlightManager/DeletedFlightManager";
import DeletedAircraftManager from "./admin/views/pages/AircraftManager/DeletedAircraftManager";
import NewsManager from "./admin/views/pages/NewsManager/NewsManager";
// import SearchResult from './user/views/pages/SearchResult';
import SearchResult from "./user/views/pages/Booking/SearchResult";
import BookingList from './user/views/pages/BookingList';
import Statistic from './admin/views/pages/Statistic/Statistic';
import UserProfile from './user/views/pages/UserProfile';
import OtpVerification from './user/views/pages/OtpVerification';
import ResetPasswordForm from './user/components/ForgotPasswordForm/ResetPasswordForm';




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
				<Route path="/otp-auth" element={<OtpVerification />} />
				<Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="/search-result" element={<SearchResult />} />
				<Route path="/booking-list" element={<BookingList />} />
				<Route path="/profile" element={<UserProfile />} />

        {/* Routes for admin */}
        <Route path="/admin" element={<AdminHome />} />

        <Route path="/admin/flights" element={<FlightsManager />} />
        <Route path="/admin/flights/add-flight" element={<CreateFlight />} />
        <Route path="/admin/flights/edit-flight/:id" element={<EditFlight />} />
        <Route
          path="/admin/flights/deleted"
          element={<DeletedFlightsManager />}
        />

        <Route path="/admin/airports" element={<AirportManager />} />
        <Route path="/admin/airports/add-airport" element={<CreateAirport />} />
        <Route
          path="/admin/airports/edit-airport/:id"
          element={<EditAirport />}
        />
        <Route
          path="/admin/airports/deleted"
          element={<DeletedAirportsManager />}
        />

        <Route path="/admin/aircrafts" element={<AircraftManager />} />
        <Route
          path="/admin/aircrafts/add-aircraft"
          element={<CreateAircraft />}
        />
        <Route
          path="/admin/aircrafts/edit-aircraft/:id"
          element={<EditAircraft />}
        />
        <Route
          path="/admin/aircrafts/deleted"
          element={<DeletedAircraftManager />}
        />

        <Route path="/admin/news" element={<NewsManager />} />
				<Route path="/admin/stats" element={< Statistic />} />
      </Routes>
    </Router>
  );
}
export default App;
