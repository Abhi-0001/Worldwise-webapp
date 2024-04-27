import Sidebar from "../../components/Sidebar/Sidebar";
import Map from "../../components/Map/Map";
import styles from "./AppLayout.module.css";
import User from "../../components/User/User";

function AppLayout({ isLoading }) {
  return (
    <div className={styles.app}>
      <Sidebar isLoading={isLoading} />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
