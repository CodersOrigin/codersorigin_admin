import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Interview from './Interview';
import Problem from './Problem';
import Machine from './Machine';
import UiPrac from './UiPrac';
import User from './User';
import Quiz from './Quiz';
import Dashboard from "./Dashbaord";
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
          <Route path="/user" element={<ProtectedRoute Component={User} />} />
          <Route path="/quiz" element={<ProtectedRoute Component={Quiz} />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

function ProtectedRoute({ Component }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
          const response = await axios.get(process.env.REACT_APP_GETUSER, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          setUserData(response.data);
          console.log('User data:', response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const isAuthenticated = localStorage.getItem('authToken') !== null;

  return isAuthenticated ? <Component userData={userData} /> : <Navigate to="/" />;
}

export default App;
