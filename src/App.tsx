import NavigationBar from "./Components/NavigationBar";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Main from "./Pages/Main";

function App() {
  return (
    <Router>
      <NavigationBar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
