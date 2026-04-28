import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { expireAdminSession, validateAdminSessionWithServer } from "../utils/adminAuth";

function AdminRouteGuard() {
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      setIsChecking(true);
      const result = await validateAdminSessionWithServer();

      if (!isMounted) {
        return;
      }

      if (!result.valid) {
        expireAdminSession(result.message);
        setIsChecking(false);
        return;
      }

      setIsChecking(false);
    };

    void validateSession();

    return () => {
      isMounted = false;
    };
  }, [location.key, location.pathname]);

  if (isChecking) {
    return (
      <section className="section shell section--tight">
        <div className="glass-panel dashboard-empty">Checking admin session...</div>
      </section>
    );
  }

  return <Outlet />;
}

export default AdminRouteGuard;
