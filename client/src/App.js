import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/register/Register";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import ProtectedComponents from "./components/ProtectedComponents";
import PublicRoute from "./components/PublicRoute";
import { useSelector } from "react-redux";
import ApplyDoctor from "./pages/ApplyDoctor";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <BrowserRouter>
      {loading && (
        <div className="spinner-parent">
          <div className="spinner-border" role="status"></div>
        </div>
      )}

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedComponents>
              <Home />
            </ProtectedComponents>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedComponents>
              <ApplyDoctor />
            </ProtectedComponents>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
