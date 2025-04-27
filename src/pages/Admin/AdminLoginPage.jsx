import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md p-8 rounded-xl shadow-xl bg-white bg-opacity-80"
            >
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>

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
                        type={showPassword ? 'text' : 'password'} // Toggle between text and password input type
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
                            <i className="fas fa-eye-slash"></i> // Eye Slash Icon when password is hidden
                        ) : (
                            <i className="fas fa-eye"></i> // Eye Icon when password is visible
                        )}
                    </button>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                    Login
                </button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
