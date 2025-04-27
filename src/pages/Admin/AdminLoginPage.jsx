import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {

    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);

        const handleChange = (event) => {
            setIsDarkMode(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.password) {
            setErrorMessage('Username and password are required.');
            return;
        }

        console.log(formData.username, formData.password);

        // Use Vite environment variables
        if (
            formData.username === import.meta.env.VITE_ADMIN_USER_NAME &&
            formData.password === import.meta.env.VITE_ADMIN_PASSWORD
        ) {
            // Redirect to admin home page after successful login
            navigate('/admin-home');
        } else {
            setErrorMessage('Invalid credentials, please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div
            className={`h-screen flex items-center justify-center p-4 ${isDarkMode
                ? 'bg-gray-900'
                : 'bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100'
                }`}
        >
            <form
                onSubmit={handleSubmit}
                className={`w-full max-w-md p-8 mb-20 rounded-xl shadow-xl ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white bg-opacity-80 text-black'
                    }`}
            >
                <h2
                    className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-700'
                        }`}
                >
                    Admin Login
                </h2>

                {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}

                <div className="form-control mb-4">
                    <label className="label">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={formData.username}
                    />
                </div>

                <div className="form-control mb-4 relative">
                    <label className="label">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="input input-bordered w-full"
                        onChange={handleChange}
                        value={formData.password}
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                        ) : (
                            <i className="fas fa-eye"></i>
                        )}
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn bg-gradient-to-br from-white via-black to-white text-white w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg"
                >
                    Login
                </button>
            </form>
        </div>

    );
};

export default AdminLoginPage;
