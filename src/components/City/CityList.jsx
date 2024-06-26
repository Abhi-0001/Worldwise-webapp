import CityItem from "./CityItem";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "./CityList.module.css";
import { useCities } from "../../Contexts/CititesContext";

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message
        message={"Please add some cities first by clicking on the map"}
      />
    );
  return (
    <ul className={`${styles.cityList}`}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
