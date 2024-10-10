import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate to Login page by default
    navigate("/Login");
  }, []);
  return (
    <div className={styles.pageWrapper}>
        <Outlet />
    </div>
  );
} 

export default Layout;