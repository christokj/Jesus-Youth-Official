import React, { lazy, Suspense } from "react";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import SkeletonHeader from "../components/Header/skeletons/SkeletonHeader";
const Header = lazy(() => import("../components/Header/Header"));


export const RootLayout = () => {
    return (
        <>
            {/* <Suspense fallback={<SkeletonHeader />}>
                <Header />
            </Suspense> */}
            <div >
                <Outlet />
            </div>
            {/* <Footer /> */}
        </>
    );
};