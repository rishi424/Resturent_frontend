import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBooking = () => {
    const { id } = useParams(); // Get the booking ID from the URL
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        guests: "",
        name: "",
        contact: "",
        email: "",
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/bookings/${id}`);

                if (response.data.success) {
                    setFormData(response.data.data); // Use `data` field from the response
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_LINK}/bookings/${id}`, formData);

            if (response.data.success) {
                toast.success("Booking updated successfully!"); // Success toast
                navigate(`/booking/${id}`); // Redirect to the booking details page after editing
            } else {
                toast.error(response.data.error || "Failed to update booking."); // Display error from the server
            }
        } catch (error) {
            console.error("Error updating booking:", error);

            // Extract error message from the API response
            const errorMessage =
                error.response?.data?.error || // Check for custom error message from the server
                error.message || // Fallback to the error message from the request
                "Failed to update booking. Please try again."; // Default error message

            toast.error(errorMessage); // Display the error message in the toast
        }
    };

    if (loading) return <div className="text-center text-gray-600">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Edit Booking</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Guests</label>
                            <input
                                type="number"
                                placeholder="Guests"
                                value={formData.guests}
                                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                className="mt-1 block w-full px- 4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                                type="text"
                                placeholder="Contact"
                                value={formData.contact}
                                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                    >
                        Update Booking
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBooking;