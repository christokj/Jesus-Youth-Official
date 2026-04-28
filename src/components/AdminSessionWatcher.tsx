import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADMIN_SESSION_EXPIRED_EVENT } from "../utils/adminAuth";

function AdminSessionWatcher() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleSessionExpired = () => {
      if (location.pathname !== "/admin-login") {
        navigate("/admin-login", {
          replace: true,
          state: { from: location.pathname },
        });
      }
    };

    window.addEventListener(ADMIN_SESSION_EXPIRED_EVENT, handleSessionExpired);

    return () => {
      window.removeEventListener(ADMIN_SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, [location.pathname, navigate]);

  return null;
}

export default AdminSessionWatcher;
