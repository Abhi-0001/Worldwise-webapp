import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://127.0.0.1:8000";

const CititesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false, error: "" };
    case "city/loaded":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
        error: "",
      };
    case "city/created":
      return {
        ...state,
        currentCity: action.payload,
        cities: [...state.cities, action.payload],
        isLoading: false,
        error: "",
      };
    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
        error: "",
      };

    case "error":
      return { ...state, error: action.payload };

    case "default":
      throw new Error("Unkown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function getCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        console.log(err.message);
        dispatch({ type: "error", payload: err.message });
      }
    }
    getCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      console.log(err);
      dispatch({ type: "error", payload: err.message });
    }
  }, []);
  async function createCity(city) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "error", payload: err.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      console.log(err.message);
      dispatch({ type: "error", payload: err.message });
    }
  }

  return (
    <CititesContext.Provider
      value={{
        cities,
        isLoading,
        getCity,
        createCity,
        deleteCity,
        currentCity,
        error,
      }}
    >
      {children}
    </CititesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CititesContext);
  if (context === undefined)
    throw new Error("Cities Provider used outside cities context");
  return context;
}

export { CitiesProvider, useCities };
