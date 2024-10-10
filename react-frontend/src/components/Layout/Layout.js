import { Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
const Layout = () => {
  return (
    <div className={styles.pageWrapper}>
        <Outlet />
    </div>
  );
} 

export default Layout;