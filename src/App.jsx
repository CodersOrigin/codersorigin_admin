import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Interview from './Interview';
import Problem from './Problem';
import Machine from './Machine';
import UiPrac from './UiPrac';
import User from './User';
import Quiz from './Quiz';
import Dashboard from "./Dashboard";
import { useEffect } from 'react';


function App() {
  return (
    <>  

      <Router>
        <Routes>
          <Route path="/login" element={<Home/>} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/interview" element={<ProtectedRoute Component={Interview} />} />
          <Route path="/machine" element={<ProtectedRoute Component={Machine} />} />
          <Route path="/uiprac" element={<ProtectedRoute Component={UiPrac} />} />
          <Route path="/problem" element={<ProtectedRoute Component={Problem} />} />
          <Route path="/user" element={<ProtectedRoute Component={User} />} />
          <Route path="/quiz" element={<ProtectedRoute Component={Quiz} />} />
        </Routes>
      </Router>
      
    </>
  );
}

function ProtectedRoute({ Component }) {
  useEffect(() => {
    // Empty dependency array ensures the effect runs only once when the component mounts
  }, []);

  const authToken = localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isAuthenticated = authToken !== null && isAdmin;

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
}

export default App;
