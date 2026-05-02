import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>

       
        <Route path="/login" element={<Login />} />

        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
               
                <Home />
              </>
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
};

export default App;