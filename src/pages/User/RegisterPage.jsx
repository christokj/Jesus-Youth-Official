import { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';
import { motion } from "framer-motion";
import { Box, Typography, TextField, MenuItem, Button, Grid, Container } from "@mui/material";

const StarsCanvas = lazy(() => import("../../components/canvas/Stars"));

// Reusable Form components using MUI
const FormInput = ({ label, name, type = "text", value, onChange, error }) => (
    <TextField
        fullWidth
        label={label}
        name={name}
        type={type}
        value={value || ''}
        onChange={onChange}
        error={!!error}
        helperText={error}
        variant="filled"
        InputProps={{
            sx: {
                backgroundColor: "rgba(145, 94, 255, 0.05)",
                color: "white",
                borderRadius: '8px',
                minHeight: '56px',
                '&:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: 'none' }
            }
        }}
        InputLabelProps={{
            shrink: type === "date" ? true : undefined,
            sx: { color: "text.secondary" }
        }}
        sx={{ mb: 2 }}
    />
);

const FormTextarea = ({ label, name, value, onChange, error }) => (
    <TextField
        fullWidth
        multiline
        rows={4}
        label={label}
        name={name}
        value={value || ''}
        onChange={onChange}
        error={!!error}
        helperText={error}
        variant="filled"
        InputProps={{
            sx: { backgroundColor: "rgba(145, 94, 255, 0.05)", color: "white", borderRadius: '8px', '&:before': { borderBottom: 'none' }, '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: 'none' } }
        }}
        InputLabelProps={{
            sx: { color: "text.secondary" }
        }}
        sx={{ mb: 2 }}
    />
);

const FormSelect = ({ label, name, value, options, onChange, error }) => (
    <TextField
        select
        fullWidth
        label={label}
        name={name}
        value={value || ''}
        onChange={onChange}
        error={!!error}
        helperText={error}
        variant="filled"
        InputProps={{
            sx: {
                backgroundColor: "rgba(145, 94, 255, 0.05)",
                color: "white",
                borderRadius: '8px',
                minHeight: '56px',
                fontSize: '1rem',
                '& .MuiSelect-select': {
                    py: '16.5px',
                    px: '12px',
                },
                '&:before': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled, .Mui-error):before': { borderBottom: 'none' }
            }
        }}
        InputLabelProps={{
            sx: { color: "text.secondary" }
        }}
        SelectProps={{
            MenuProps: {
                PaperProps: {
                    sx: {
                        maxHeight: 300,
                        bgcolor: '#151030',
                        '& .MuiMenuItem-root': {
                            py: 1.5,
                            px: 2,
                            fontSize: '1rem',
                        }
                    }
                }
            }
        }}
        sx={{ mb: 2 }}
    >
        {options.map((option) => (
            <MenuItem key={option} value={option}>
                {option}
            </MenuItem>
        ))}
    </TextField>
);

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        unit: "",
        address: "",
        mobile: "",
        place: "",
        maritalStatus: "",
        dob: "",
        parish: "",
        gender: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const validateForm = () => {
        let tempErrors = {};
        const phoneRegex = /^[6-9]\d{9}$/;
        const age = parseInt(formData.age, 10);

        if (!formData.name.trim()) tempErrors.name = "Name is required.";
        if (!phoneRegex.test(formData.mobile)) tempErrors.mobile = "Please enter a valid mobile number.";
        if (isNaN(age) || age > 50) tempErrors.age = "Age must be a number and not more than 50.";
        if (!formData.unit.trim()) tempErrors.unit = "Unit is required.";
        if (!formData.address.trim()) tempErrors.address = "Address is required.";
        if (!formData.place.trim()) tempErrors.place = "Place is required.";
        if (!formData.maritalStatus.trim()) tempErrors.maritalStatus = "Marital status is required.";
        if (!formData.dob.trim()) tempErrors.dob = "Date of birth is required.";
        if (!formData.parish.trim()) tempErrors.parish = "Parish is required.";
        if (!formData.gender.trim()) tempErrors.gender = "Gender is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        if (validateForm()) {
            setIsSubmitting(true);
            try {
                toast.success("Successfully registered for Jesus Youth Chengaloor!");
                setTimeout(() => navigate('/'), 2000);
            } catch (error) {
                toast.error("Something went wrong. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const unitOptions = [
        "St George", "St Paul", "Kalvari", "St John", "Rose Mystica", "Francis Assisi", "Kochuthresya", "Jesus Christ",
        "Christhuraj", "St Joseph", "Cherupushpam", "Lourde Matha", "Thiruhrudayam", "Thirukkudumbam", "St Antony's",
        "Karmalamatha", "Mother Theresa", "St Jude", "Chavara Kuriakose", "St Raphael", "Alphonsamma", "Mariam Thresya",
        "Merimatha", "St Sebastian", "St Xavier", "Vyakulamatha", "St Michael", "Vimalahrudayam", "St Thomas", "Other"
    ];

    return (
        <Box sx={{ position: "relative", zIndex: 0, bgcolor: "background.default", minHeight: "100vh", pt: 12, pb: 8 }}>
            <Toaster position="top-center" richColors />

            <Container maxWidth="md" sx={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box
                        sx={{
                            backgroundColor: "background.paper",
                            p: { xs: 4, md: 6 },
                            borderRadius: "24px",
                            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.5)",
                            border: "1px solid rgba(145, 94, 255, 0.3)",
                        }}
                    >
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle1" sx={{ color: "text.secondary", textTransform: "uppercase", letterSpacing: 2 }}>
                                Join the Movement
                            </Typography>
                            <Typography variant="h2" sx={{ color: "white", fontWeight: 700, fontSize: { xs: "2rem", sm: "3rem" } }}>
                                Register for One Day Program
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <FormInput label="Fullname" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormInput label="Age" name="age" type="number" value={formData.age} onChange={handleChange} error={errors.age} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormInput label="Mobile Number" name="mobile" type="tel" value={formData.mobile} onChange={handleChange} error={errors.mobile} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormInput label="Place" name="place" value={formData.place} onChange={handleChange} error={errors.place} />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ width: '30%' }}>
                                    <FormInput label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} error={errors.dob} />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ width: '30%' }}>
                                    <FormSelect label="Unit" name="unit" value={formData.unit} options={unitOptions} onChange={handleChange} error={errors.unit} />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ width: '30%' }}>
                                    <FormSelect
                                        label="Marital Status"
                                        name="maritalStatus"
                                        value={formData.maritalStatus}
                                        options={["Single", "Married", "Divorced", "Widowed"]}
                                        onChange={handleChange}
                                        error={errors.maritalStatus}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ width: '30%' }}>
                                    <FormSelect
                                        label="Parish"
                                        name="parish"
                                        value={formData.parish}
                                        options={["Chengaloor", "Other"]}
                                        onChange={handleChange}
                                        error={errors.parish}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ width: '30%' }}>
                                    <FormSelect
                                        label="Gender"
                                        name="gender"
                                        value={formData.gender}
                                        options={["Male", "Female", "Other"]}
                                        onChange={handleChange}
                                        error={errors.gender}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                                    <FormTextarea label="Address" name="address" value={formData.address} onChange={handleChange} error={errors.address} />
                                </Grid>
                            </Grid>

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                disabled={isSubmitting}
                                sx={{
                                    mt: 4,
                                    py: 2,
                                    fontSize: "1.1rem",
                                    backgroundColor: "primary.main",
                                    color: "white",
                                    boxShadow: "0 4px 6px -1px rgba(145, 94, 255, 0.5)",
                                    "&:hover": {
                                        backgroundColor: "secondary.main",
                                    }
                                }}
                            >
                                {isSubmitting ? "Registering..." : "Register for One Day Program"}
                            </Button>
                        </Box>
                    </Box>
                </motion.div>
            </Container>

            <Suspense fallback={null}>
                <StarsCanvas />
            </Suspense>
        </Box>
    );
};

export default RegisterPage;
