import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Import the Footer component
import Hero from "./components/Hero";
import ServicesPage from "./pages/ServicesPage";
import BookServicePage from "./pages/BookServicePage";
import BookingPaymentPage from "./pages/BookingPaymentPage";
import ChargingStationsPage from "./pages/ChargingStationsPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ClientDashboard from "./pages/client/ClientDashboard";
import ServiceProviderDashboard from "./pages/provider/ServiceProviderDashboard";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import AdminRegistration from "./components/auth/AdminRegistration";

export default function App() {
	const { isAuthenticated, role } = useAuthStore();

	const getDashboardRoute = () => {
		switch (role) {
			case "admin":
				return <AdminDashboard />;
			case "provider":
				return <ServiceProviderDashboard />;
			case "client":
				return <ClientDashboard />;
			default:
				return <Navigate to="/login" />;
		}
	};

	return (
		<Router>
			<div className="min-h-screen bg-gray-50 flex flex-col">
				<Navbar />
				<div className="flex-grow">
					<Routes>
						{/* Public routes */}
						<Route
							path="/"
							element={
								<>
									<Hero />
									<ServicesPage />
								</>
							}
						/>
						<Route path="/services" element={<ServicesPage />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/register" element={<RegisterForm />} />
						<Route path="/register/admin" element={<AdminRegistration />} />

						{/* Protected routes */}
						<Route path="/dashboard/*" element={getDashboardRoute()} />
						<Route
							path="/book-service"
							element={
								isAuthenticated ? <BookServicePage /> : <Navigate to="/login" />
							}
						/>
						<Route
							path="/booking/payment"
							element={
								isAuthenticated ? (
									<BookingPaymentPage />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
						<Route
							path="/charging-stations"
							element={
								isAuthenticated ? (
									<ChargingStationsPage />
								) : (
									<Navigate to="/login" />
								)
							}
						/>
					</Routes>
				</div>
				<Footer /> {/* Add the Footer component here */}
			</div>
		</Router>
	);
}
