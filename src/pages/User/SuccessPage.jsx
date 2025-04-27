// src/pages/SuccessPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-200 to-purple-300 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full">
                <h2 className="text-3xl font-bold text-green-600 mb-6">Registration Successful!</h2>
                <p className="text-lg text-gray-600 mb-4">
                    You have successfully registered. Thank you!
                </p>
                <Link to="/" className="btn btn-primary">
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
