import { Outlet } from "react-router-dom";

import AppNav from "../AppNav/AppNav";
import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} by Wordwise Inc.
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
