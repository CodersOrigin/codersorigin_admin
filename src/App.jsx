import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./Home";
import Interview from "./Interview";
import Problem from "./Problem";
import Machine from "./Machine";
import UiPrac from "./UiPrac";
import User from "./User";
import Quiz from "./Quiz";
import Dashboard from "./Dashboard";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route
            path="/"
            element={
              <Dashboard
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            path="/interview"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} Component={Interview} />
            }
          />
          <Route
            path="/machine"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} Component={Machine} />
            }
          />
          <Route
            path="/uiprac"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} Component={UiPrac} />
            }
          />
          <Route
            path="/problem"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} Component={Problem} />
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} Component={User} />
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} Component={Quiz} />
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

function ProtectedRoute({ Component, isLoggedIn }) {
  return isLoggedIn ? <Component /> : <Navigate to="/" />;
}

export default App;
