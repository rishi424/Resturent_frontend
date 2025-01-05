import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingDetails = () => {
    const { id } = useParams(); // Get the booking ID from the URL
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/bookings/${id}`);
                if (response.data.success) {
                    setBooking(response.data.data); // Use `data` field from the response
                } else {
                    toast.error(response.data.error || "Failed to load booking details.");
                }
            } catch (error) {
                console.error("Error fetching booking:", error);

                // Extract error message from the API response
                const errorMessage =
                    error.response?.data?.error || // Check for custom error message from the server
                    error.message || // Fallback to the error message from the request
                    "Failed to load booking details. Please try again."; // Default error message
                toast.error(errorMessage); // Display the error message in the toast
            } finally {
                setLoading(false);
            }
        };
        fetchBooking();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/bookings/${id}`);
            if (response.data.success) {
                toast.success("Booking deleted successfully!"); // Success toast
                navigate("/"); // Redirect to the home page after deletion
            } else {
                toast.error(response.data.error || "Failed to delete booking.");
            }
        } catch (error) {
            console.error("Error deleting booking:", error);

            // Extract error message from the API response
            const errorMessage =
                error.response?.data?.error || // Check for custom error message from the server
                error.message || // Fallback to the error message from the request
                "Failed to delete booking. Please try again."; // Default error message

            toast.error(errorMessage); // Display the error message in the toast
        }
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;
    if (!booking) return <div className="text-center text-gray-600">No booking found.</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Booking Details</h1>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <p className="mt-1 text-lg text-gray-900">{booking.name}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <p className="mt-1 text-lg text-gray-900">{booking.date}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <p className="mt-1 text-lg text-gray-900">{booking.time}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Guests</label>
                            <p className="mt-1 text-lg text-gray-900">{booking.guests}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <p className="mt-1 text-lg text-gray-900">{booking.contact}</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <p className="mt-1 text-lg text-gray-900">{booking.email}</p>
                        </div>
                    </div>
                    <div className="flex justify-between space-x-4">
                        <button
                            onClick={() => navigate("/")} // Navigate to home page
                            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
                        >
                            Home Page
                        </button>
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate(`/booking/edit/${id}`)}
                                className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDetails;