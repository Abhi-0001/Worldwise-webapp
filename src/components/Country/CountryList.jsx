import CountryItem from "./CountryItem";
import Spinner from "../Spinner/Spinner";
import Message from "../Message/Message";
import styles from "./CountryList.module.css";
import { useCities } from "../../Contexts/CititesContext";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message
        message={"Please add some cities first by clicking on the map"}
      />
    );

  const countries = cities.reduce((countryArr, city) => {
    if (!countryArr.map((c) => c.country).includes(city.country))
      return [...countryArr, { country: city.country, emoji: city.emoji }];
    else return countryArr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country, i) => (
        <CountryItem country={country} key={i} />
      ))}
    </ul>
  );
}

export default CountryList;
