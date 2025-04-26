import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePage from "../pages/User/HomePage";
import { ErrorPage } from "../pages/User/ErrorPage";
import ScrollToTop from "../components/ui/ScrollToTop";
import RegisterPage from "../pages/User/RegisterPage";

{/* <Route path="/" element={<HomePage />} /> */ }
// <Route path="/menu/:menuId" element={<MenuPage />} /> {/* Dynamic Route */}

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ScrollToTop>
                <RootLayout />
            </ScrollToTop>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "register-page",
                element: <RegisterPage />,
            },

        ],
    }
]);