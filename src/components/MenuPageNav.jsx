// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMenu } from '../redux/menuSlice';

// function MenuPageNav() {
//     const dispatch = useDispatch();
//     const selectedMenu = useSelector((state) => state.menu.selectedMenu);

//     const imageUrl2 = 'https://res.cloudinary.com/dfm6raue1/image/upload/v1743000964/deepnetbackground_musvij.png';

//     const handleMenuClick = (menuName) => {
//         dispatch(setMenu(menuName));
//     };

//     return (
//         <>
//             <section>
//                 <div
//                     className="relative h-[79px] bg-cover bg-center bg-repeat-x"
//                     style={{
//                         backgroundImage: `url('${imageUrl2}')`,
//                         backgroundSize: 'auto 100%' // Ensures full height while repeating width
//                     }}
//                 >
//                     <nav className="text-white flex justify-center items-center h-20">
//                         <ul className="flex justify-center items-center space-x-6">
//                             {["FOOD", "DRINKS", "BRUNCH"].map((menu) => (
//                                 <li key={menu}>
//                                     <button
//                                         onClick={() => handleMenuClick(menu)}
//                                         className={`w-24 py-2 px-4 font-semibold border border-blue-300 rounded
//                                         ${selectedMenu === menu ? 'bg-blue-500 text-white' : 'bg-black hover:bg-blue-500 hover:text-white'}`}
//                                     >
//                                         {menu}
//                                     </button>
//                                 </li>
//                             ))}
//                         </ul>
//                     </nav>
//                 </div>
//             </section>
//         </>
//     );
// }

// export default MenuPageNav;
