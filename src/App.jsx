import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import CityList from "./components/City/CityList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import CountryList from "./components/Country/CountryList";
import { CitiesProvider } from "./Contexts/CititesContext";
import { AuthProvider } from "./Contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import SpinnerFullPage from "./components/Spinner/SpinnerFullPage";
// import HomePage from "./pages/HomePage/Homepage";
// import Pricing from "./pages/Pricing/Pricing";
// import Product from "./pages/Product/Product";
// import Login from "./pages/Login/Login";
// import PageNotFound from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout/AppLayout";

const HomePage = lazy(() => import("./pages/HomePage/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing/Pricing"));
const Product = lazy(() => import("./pages/Product/Product"));
const Login = lazy(() => import("./pages/Login/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout/AppLayout"));

// const BASE_URL = "http://127.0.0.1:8000";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/pricing" element={<Pricing />}></Route>
              <Route path="/product" element={<Product />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route replace index element={<Navigate to={"cities"} />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
