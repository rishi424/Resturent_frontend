import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const BookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/bookings`);

                if (response.data.success) {
                    setBookings(response.data.data); // Use `data` field from the response
                } else {
                    toast.error(response.data.error || "Failed to load bookings.");
                }
            } catch (error) {
                console.error("Error fetching bookings:", error);

                // Extract error message from the API response
                const errorMessage =
                    error.response?.data?.error || // Check for custom error message from the server
                    error.message || // Fallback to the error message from the request
                    "Failed to load bookings. Please try again."; // Default error message

                toast.error(errorMessage); // Display the error message in the toast
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_LINK}/api/bookings/${id}`);

            if (response.data.success) {
                setBookings(bookings.filter((booking) => booking._id !== id)); // Remove the deleted booking from the list
                toast.success("Booking deleted successfully!"); // Success toast
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

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8">Bookings</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    {loading ? (
                        <div className="text-center text-gray-600">Loading...</div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center text-gray-600">No bookings found.</div>
                    ) : (
                        <ul className="space-y-4">
                            {bookings.map((booking) => (
                                <li
                                    key={booking._id}
                                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-200"
                                >
                                    <Link
                                        to={`/booking/${booking._id}`}
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        {booking.name}
                                    </Link>
                                    <div className="flex space-x-4">
                                        <Link
                                            to={`/booking/edit/${booking._id}`}
                                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(booking._id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mt-6 text-center">
                    <Link
                        to="/booking/new"
                        className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                        Create New Booking
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BookingList;