import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { axiosInstance } from "../config/axiosInstance";

const AddMenuItemForm = () => {
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const menuName = useSelector((state) => state.menu.selectedMenu);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!menuName) {
            alert("Please select a menu before adding an item.");
            return;
        }
        axiosInstance({
            method: 'post',
            url: '/user/create',
            data: {
                itemName,
                price,
                description,
                menuName
            }
        }).then(function (response) {
            setItemName("");
            setPrice("");
            setDescription("");
            console.log(response);
            alert("Item added successfully!");
        });
    };

    return (
        <motion.div
            className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border m-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Add New Menu Item</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600 font-medium">Menu Name</label>
                    <input
                        type="text"
                        value={menuName || "Select a menu"}
                        disabled
                        className="w-full p-3 border rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        placeholder="Enter item name"
                        required
                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Price ($)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter price"
                        required
                        min="0"
                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
                    />
                </div>

                <div>
                    <label className="block text-gray-600 font-medium">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter item description"
                        rows="3"
                        className="w-full p-3 border rounded-md focus:ring focus:ring-blue-200"
                    ></textarea>
                </div>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition duration-300"
                >
                    Add Item
                </motion.button>
            </form>
        </motion.div>
    );
};

export default AddMenuItemForm;
