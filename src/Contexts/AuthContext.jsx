import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuth: false,
};

const FAKE_USER = {
  name: "Abhi",
  email: "abhi@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuth: true };
    case "logout":
      return { ...state, user: null, isAuth: false };
    case "default":
      throw new Error("Unknown Action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function handleLogin(email, pass) {
    if (email === FAKE_USER.email && pass === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function handleLogout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Provider used outside cities context");
  return context;
}

export { useAuth, AuthProvider };
