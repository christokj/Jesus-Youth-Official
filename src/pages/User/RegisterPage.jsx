import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner';

// Reusable Input Component
const FormInput = ({ label, name, type = "text", onChange, error }) => (
    <div className="form-control mb-4">
        <label className="label">{label}</label>
        <input
            type={type}
            name={name}
            className="input input-bordered w-full"
            onChange={onChange}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);

// Reusable Textarea Component
const FormTextarea = ({ label, name, onChange, error }) => (
    <div className="form-control mb-4">
        <label className="label">{label}</label>
        <textarea
            name={name}
            className="textarea textarea-bordered w-full"
            onChange={onChange}
        />
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);

// Reusable Select Component
const FormSelect = ({ label, name, options, onChange, error }) => (
    <div className="form-control mb-4">
        <label className="label">{label}</label>
        <select
            name={name}
            className="select select-bordered w-full"
            onChange={onChange}
            defaultValue=""
        >
            <option value="" disabled>Select {label.toLowerCase()}</option>
            {options.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
            ))}
        </select>
        {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
);

const RegisterPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
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

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setIsDarkMode(mediaQuery.matches);
        const handleChange = e => setIsDarkMode(e.matches);
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

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
                await axiosInstance.post('/user/register', formData);
                // alert("Registration successful!");
                toast.success("Registration successful!", { icon: '🌟' })

                navigate('/success');
            } catch (error) {
                alert("Something went wrong. Please try again.");
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
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-pink-100 flex items-center justify-center p-4 pt-16">
            <Toaster position="top-center" richColors />
            <form
                onSubmit={handleSubmit}
                className={`w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] p-6 rounded-xl shadow-2xl backdrop-blur-lg 
          ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white bg-opacity-80 text-black'}`}
            >
                <h2 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Registration Form
                </h2>

                <FormInput label="Fullname" name="name" onChange={handleChange} error={errors.name} />
                <FormInput label="Age" name="age" type="number" onChange={handleChange} error={errors.age} />
                <FormSelect label="Unit" name="unit" options={unitOptions} onChange={handleChange} error={errors.unit} />
                <FormTextarea label="Address" name="address" onChange={handleChange} error={errors.address} />
                <FormInput label="Mobile Number" name="mobile" type="tel" onChange={handleChange} error={errors.mobile} />
                <FormInput label="Place" name="place" onChange={handleChange} error={errors.place} />

                <FormSelect
                    label="Marital Status"
                    name="maritalStatus"
                    options={["Single", "Married", "Divorced", "Widowed"]}
                    onChange={handleChange}
                    error={errors.maritalStatus}
                />

                <FormInput label="Date of Birth" name="dob" type="date" onChange={handleChange} error={errors.dob} />

                <FormSelect
                    label="Parish"
                    name="parish"
                    options={["Chengaloor", "Other"]}
                    onChange={handleChange}
                    error={errors.parish}
                />

                <FormSelect
                    label="Gender"
                    name="gender"
                    options={["Male", "Female", "Other"]}
                    onChange={handleChange}
                    error={errors.gender}
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn bg-gradient-to-br from-white via-black to-white text-white w-full py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:brightness-110 hover:shadow-lg"
                >
                    {isSubmitting ? (
                        <span className="flex justify-center items-center">
                            <span className="loading loading-spinner loading-sm mr-2"></span>Submitting...
                        </span>
                    ) : (
                        "Submit"
                    )}
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
