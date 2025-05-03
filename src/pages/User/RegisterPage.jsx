import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const navigate = useNavigate();

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
        name: "",
        age: "",
        unit: "",
        address: "",
        mobile: "",
        place: "",
        maritalStatus: "",
        dob: "",
        parish: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let tempErrors = {};
        const phoneRegex = /^[6-9]\d{9}$/; // Must start with 6, 7, 8, or 9 and be exactly 10 digits
        const mobile = formData.mobile;
        const name = formData.name;
        const unit = formData.unit;
        const address = formData.address;
        const place = formData.place;
        const maritalStatus = formData.maritalStatus;
        const dob = formData.dob;
        const parish = formData.parish;
        const age = parseInt(formData.age, 10);

        if (!phoneRegex.test(mobile)) {
            tempErrors.mobile = "Please enter a valid mobile number.";
        }
        if (isNaN(age) || age > 50) {
            tempErrors.age = "Age must be a number and not more than 50.";
        }
        if (!name?.trim()) tempErrors.name = "Name is required.";
        if (!unit?.trim()) tempErrors.unit = "Unit is required.";
        if (!address?.trim()) tempErrors.address = "Address is required.";
        if (!place?.trim()) tempErrors.place = "Place is required.";
        if (!maritalStatus?.trim()) tempErrors.maritalStatus = "Marital status is required.";
        if (!dob?.trim()) tempErrors.dob = "Date of birth is required.";
        if (!parish?.trim()) tempErrors.parish = "Parish is required.";

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0; // return true if no errors
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log(formData);
            axiosInstance({
                method: 'post',
                url: '/user/register',
                data: formData
            }).then(function (response) {
                setFormData("");
                console.log(response);
                alert("Registration successful!");
                navigate('/success');
            });
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br  from-blue-100 via-purple-200 to-pink-100 flex items-center justify-center p-4 pt-16">
                <form
                    onSubmit={handleSubmit}
                    className={`w-full max-w-[90%] sm:max-w-[500px] md:max-w-[600px] p-6 rounded-xl shadow-xl backdrop-blur-lg 
                        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white bg-opacity-80 text-black'}
                       `}
                >
                    <h2 className={`text-3xl font-bold text-center mb-6 ${isDarkMode ? 'text-white' : 'text-gray-700'}`}>Registration Form</h2>

                    <div className="form-control mb-4">
                        <label className="label">Fullname</label>
                        <input
                            type="text"
                            name="name"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Age</label>
                        <input
                            type="number"
                            name="age"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Unit</label>
                        <select
                            name="unit"
                            className="select select-bordered w-full"
                            onChange={handleChange}
                        >
                            <option value="">Select a Unit </option>
                            <option>St George</option>
                            <option>St Paul</option>
                            <option>Kalvari</option>
                            <option>St John</option>
                            <option>Rose Mystica</option>
                            <option>Francis Assisi</option>
                            <option>Kochuthresya</option>
                            <option>Jesus Christ</option>
                            <option>Christhuraj</option>
                            <option>St Joseph</option>
                            <option>Cherupushpam</option>
                            <option>Lourde Matha</option>
                            <option>Thiruhrudayam</option>
                            <option>Thirukkudumbam</option>
                            <option>St Antony's</option>
                            <option>Karmalamatha</option>
                            <option>Mother Theresa</option>
                            <option>St Jude</option>
                            <option>Chavara Kuriakose</option>
                            <option>St Raphael</option>
                            <option>Alphonsamma</option>
                            <option>Mariam Thresya</option>
                            <option>Merimatha</option>
                            <option>St Sebastian</option>
                            <option>St Xavier</option>
                            <option>Vyakulamatha</option>
                            <option>St Michael</option>
                            <option>Vimalahrudayam</option>
                            <option>St Thomas</option>
                            <option>Other</option>
                        </select>
                        {errors.unit && <span className="text-red-500 text-sm">{errors.unit}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Address</label>
                        <textarea
                            name="address"
                            className="textarea textarea-bordered w-full"
                            onChange={handleChange}
                        />
                        {errors.address && <span className="text-red-500 text-sm">{errors.address}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Mobile Number</label>
                        <input
                            type="tel"
                            name="mobile"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        {errors.mobile && <span className="text-red-500 text-sm">{errors.mobile}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Place</label>
                        <input
                            type="text"
                            name="place"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        {errors.place && <span className="text-red-500 text-sm">{errors.place}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Marital Status</label>
                        <select
                            name="maritalStatus"
                            className="select select-bordered w-full"
                            onChange={handleChange}
                        >
                            <option disabled selected>Select status</option>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Divorced</option>
                            <option>Widowed</option>
                        </select>
                        {errors.maritalStatus && <span className="text-red-500 text-sm">{errors.maritalStatus}</span>}
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Date of Birth</label>
                        <input
                            type="date"
                            name="dob"
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                        {errors.dob && <span className="text-red-500 text-sm">{errors.dob}</span>}

                    </div>

                    <div className="form-control mb-6">
                        <label className="label">Parish</label>
                        <select
                            type="text"
                            name="parish"
                            className="select select-bordered w-full"
                            onChange={handleChange}
                        >
                            <option disabled selected>Select parish</option>
                            <option>Chengaloor</option>
                            <option>Other</option>
                        </select>
                        {errors.parish && <span className="text-red-500 text-sm">{errors.parish}</span>}

                    </div>

                    <button
                        type="submit"
                        className="btn bg-gradient-to-br from-white via-black to-white text-white w-full 
                                     py-3 rounded-lg font-semibold transition-all duration-300 
                                     hover:scale-105 hover:brightness-110 hover:shadow-lg"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
