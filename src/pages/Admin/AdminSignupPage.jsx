import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../../config/axiosInstance';
import { Toaster, toast } from 'sonner';
import { Box, Typography, TextField, Button, Container, InputAdornment, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AdminSignupPage = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            toast.error('All fields are required.', { icon: '❌' });
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match.', { icon: '❌' });
            return;
        }

        try {
            const response = await axiosInstance({
                url: `/admin/signup`,
                method: "POST",
                data: {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                },
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success(response.data.message || "Admin account created successfully!", { icon: '🎉' });
                setTimeout(() => {
                    navigate('/admin-login', { replace: true });
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message, { icon: '🚫' });
            } else {
                toast.error("Server error during registration. Please try again.", { icon: '🚫' });
                console.error('Network error', error);
            }
        }
    };

    return (
        <Box sx={{ position: "relative", zIndex: 0, bgcolor: "background.default", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", py: 4 }}>
            <Toaster position="top-center" richColors />
            
            <Container maxWidth="sm">
                <Box
                    sx={{
                        backgroundColor: "background.paper",
                        p: { xs: 4, md: 5 },
                        borderRadius: "24px",
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
                        border: "1px solid rgba(145, 94, 255, 0.3)",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography variant="h4" sx={{ color: "white", fontWeight: "bold", textAlign: "center", mb: 4 }}>
                        Admin Sign Up
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            fullWidth
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            variant="filled"
                            InputProps={{
                                sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white", borderRadius: '8px', '&:before': { borderBottom: 'none' }, '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: 'none' } }
                            }}
                            InputLabelProps={{
                                sx: { color: "text.secondary" }
                            }}
                        />

                        <TextField
                            fullWidth
                            type="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            variant="filled"
                            InputProps={{
                                sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white", borderRadius: '8px', '&:before': { borderBottom: 'none' }, '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: 'none' } }
                            }}
                            InputLabelProps={{
                                sx: { color: "text.secondary" }
                            }}
                        />

                        <TextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            label="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            variant="filled"
                            InputProps={{
                                sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white", borderRadius: '8px', '&:before': { borderBottom: 'none' }, '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: 'none' } },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                sx: { color: "text.secondary" }
                            }}
                        />

                        <TextField
                            fullWidth
                            type={showConfirmPassword ? 'text' : 'password'}
                            label="Confirm Password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            variant="filled"
                            InputProps={{
                                sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white", borderRadius: '8px', '&:before': { borderBottom: 'none' }, '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: 'none' } },
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            sx={{ color: "text.secondary" }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            InputLabelProps={{
                                sx: { color: "text.secondary" }
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{
                                mt: 2,
                                py: 1.5,
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                backgroundColor: "primary.main",
                                color: "white",
                                boxShadow: "0 4px 6px -1px rgba(145, 94, 255, 0.5)",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "secondary.main",
                                    transform: "scale(1.02)"
                                }
                            }}
                        >
                            Sign Up
                        </Button>

                        <Box sx={{ mt: 2, textAlign: "center" }}>
                            <Link to="/admin-login" style={{ textDecoration: 'none' }}>
                                <Typography variant="body2" sx={{ color: "primary.main", "&:hover": { textDecoration: 'underline' } }}>
                                    Already have an admin account? Login here.
                                </Typography>
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminSignupPage;
