import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS
import BookingList from "./components/BookingList";
import BookingForm from "./components/BookingForm";
import BookingDetails from "./components/BookingDetails";
import EditBooking from "./components/EditBooking";
import './index.css'
import { ToastContainer } from "react-toastify";
const App = () => {
    return (
        <>
            <div><ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            /></div>
            <Router>
                <Routes>
                    <Route path="/" element={<BookingList />} />
                    <Route path="/booking/new" element={<BookingForm />} />
                    <Route path="/booking/:id" element={<BookingDetails />} />
                    <Route path="/booking/edit/:id" element={<EditBooking />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;