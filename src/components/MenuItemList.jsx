// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { axiosInstance } from "../config/axiosInstance";
// import { FaTrash } from "react-icons/fa";

// const MenuItemList = ({ handleDelete, items, setItems }) => {
//   const selectedMenu = useSelector((state) => state.menu.selectedMenu);

//   useEffect(() => {
//     if (selectedMenu) {
//       axiosInstance
//         .get(`/user/fetch-menu/${selectedMenu}`)
//         .then((response) => {
//           setItems(response.data.menuItems);
//         });
//     }
//   }, [selectedMenu]);

//   const imageUrl =
//     "https://res.cloudinary.com/dfm6raue1/image/upload/v1743004351/BACKGROUND_IMAGE_vhqf6e.png";

//   return (
//     <section className="relative min-h-screen py-10">
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url('${imageUrl}')`,
//           backgroundSize: "cover", // Ensures full coverage
//           backgroundPosition: "center", // Keeps it centered
//         }}
//       />

//       <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"></div>

//       <div className="relative flex justify-center items-center h-full px-4">
//         <div className="flex flex-col items-center w-full max-w-5xl border border-gray-600 bg-black/30 rounded-xl p-6 text-white">
//           <div>
//             <h1 className="text-2xl sm:text-4xl font-bold mb-6 ">BRUNCH COCKTAILS</h1>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
//             {items &&
//               items.map((item, index) => (
//                 <div
//                   key={index}
//                   className="p-4 flex justify-between items-start border border-gray-500 rounded-lg bg-black/20 backdrop-blur-md"
//                 >
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-white">
//                       {item.name} - <span className="text-white">${item.price}</span>
//                     </h3>
//                     <p className="text-gray-300 mt-2">{item.description}</p>
//                   </div>

//                   <button
//                     onClick={() => handleDelete(item._id)}
//                     className="text-red-300 cursor-pointer hover:bg-red-500/20 p-2 rounded-full transition duration-200"
//                   >
//                     <FaTrash size={18} />
//                   </button>
//                 </div>
//               ))}
//           </div>

//           <Link
//             to="/add-menu-item"
//             className="z-10 mt-8 px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out"
//           >
//             Add a New Item
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default MenuItemList;
