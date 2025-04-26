import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import HomePage from "../pages/User/HomePage";
import { ErrorPage } from "../pages/User/ErrorPage";
import ScrollToTop from "../components/ui/ScrollToTop";
import MenuPage from "../pages/User/MenuPage";
import NewMenuEntryPage from "../pages/User/NewMenuEntryPage";

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
                path: "menu-page",
                element: <MenuPage />,
            },
            {
                path: "add-menu-item",
                element: <NewMenuEntryPage />
            }

        ],
    }
]);