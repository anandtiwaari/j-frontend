import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Main from "./Pages/Main";
import Register from "./Pages/auth/Register";
import Login from "./Pages/auth/Login";
import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import axios from "axios";
import Analytics from "./Pages/Analytics";
function App() {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Main />
              </PrivateRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            }
          />
          <Route
            path="/analytics"
            element={
              <PrivateRoutes>
                <Analytics />
              </PrivateRoutes>
            }
          />

          {/* Public Routes */}
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
