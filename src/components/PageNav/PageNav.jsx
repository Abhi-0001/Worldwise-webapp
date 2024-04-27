import { NavLink, Link } from "react-router-dom";
import Logo from "../Logo/Logo";

import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <div className={styles.nav}>
      <Logo />
      <ul>
        <li>
          {" "}
          <NavLink to="/pricing">Pricing</NavLink>{" "}
        </li>
        <li>
          {" "}
          <NavLink to="/product">Product</NavLink>{" "}
        </li>
        <li>
          {" "}
          <Link to="/login" className={`cta`}>
            Login
          </Link>{" "}
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
