import { useState } from "react";
import { deleteMenuItem } from "../../services/menuItemService";

const RegisterPage = () => {

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData); // Handle submission
    };

    return (
        <div>
            {/* <MenuPageHeader />
            <div>
                <MenuPageNav />
            </div>
            <div>
                <MenuItemList handleDelete={handleDelete} items={items} setItems={setItems} />
            </div> */}
            <div className="min-h-screen bg-gradient-to-br  from-blue-100 via-purple-200 to-pink-100 flex items-center justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-lg p-8 bg-white bg-opacity-80 rounded-xl shadow-xl backdrop-blur-lg"
                >
                    <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Registration Form</h2>

                    <div className="form-control mb-4">
                        <label className="label">Name</label>
                        <input type="text" name="name" className="input input-bordered w-full" onChange={handleChange} />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Age</label>
                        <input type="number" name="age" className="input input-bordered w-full" onChange={handleChange} />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Unit</label>
                        <input type="text" name="unit" className="input input-bordered w-full" onChange={handleChange} />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Address</label>
                        <textarea name="address" className="textarea textarea-bordered w-full" onChange={handleChange} />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Mobile Number</label>
                        <input type="tel" name="mobile" className="input input-bordered w-full" onChange={handleChange} />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Place</label>
                        <input type="text" name="place" className="input input-bordered w-full" onChange={handleChange} />
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Marital Status</label>
                        <select name="maritalStatus" className="select select-bordered w-full" onChange={handleChange}>
                            <option disabled selected>Select status</option>
                            <option>Single</option>
                            <option>Married</option>
                            <option>Divorced</option>
                            <option>Widowed</option>
                        </select>
                    </div>

                    <div className="form-control mb-4">
                        <label className="label">Date of Birth</label>
                        <input type="date" name="dob" className="input input-bordered w-full" onChange={handleChange} />
                    </div>

                    <div className="form-control mb-6">
                        <label className="label">Parish</label>
                        <input type="text" name="parish" className="input input-bordered w-full" onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
