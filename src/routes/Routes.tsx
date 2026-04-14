import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePage from "../pages/User/HomePage";
import { ErrorPage } from "../pages/User/ErrorPage";
import RegisterPage from "../pages/User/RegisterPage";
import AdminHomepage from "../pages/Admin/AdminHomepage";
import SuccessPage from "../pages/User/SuccessPage";
import AdminLoginPage from "../pages/Admin/AdminLoginPage";
import ContactPage from "../pages/User/ContactPage";
import AdminRegisterPage from "../pages/Admin/AdminRegisterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register-page", element: <RegisterPage /> },
      { path: "admin-home", element: <AdminHomepage /> },
      { path: "success", element: <SuccessPage /> },
      { path: "admin-login", element: <AdminLoginPage /> },
      { path: "contact-page", element: <ContactPage /> },
      { path: "admin-register", element: <AdminRegisterPage /> },
    ],
  },
]);
