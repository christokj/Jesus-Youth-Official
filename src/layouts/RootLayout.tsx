import { Outlet, useLocation } from "react-router-dom";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import RainParticles from "../components/RainParticles";
import ScrollToTop from "../components/ui/ScrollToTop";
import AdminSessionWatcher from "../components/AdminSessionWatcher";

export function RootLayout() {
  const location = useLocation();
  const isAdminDashboard = location.pathname === "/admin-home";

  return (
    <>
      <AdminSessionWatcher />
      <ScrollToTop />
      <div className="site-shell">
        <div className="site-background-orb site-background-orb--one" />
        <div className="site-background-orb site-background-orb--two" />
        <div className="site-background-grid" />
        <RainParticles />
        <SiteHeader />
        <main className="site-main">
          <Outlet />
        </main>
        {!isAdminDashboard && <SiteFooter />}
      </div>
    </>
  );
}
