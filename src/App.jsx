import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Home from './Home';
import Interview from './Interview';
import Problem from './Problem';
import Machine from './Machine';
import UiPrac from './UiPrac';
import User from './User';
import Quiz from './Quiz';
import Dashboard from "./Dashboard";
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Preloader from "../src/image/preloader.gif";
function App() {

  const [isLoggedin, setIsLoggedin] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async (authToken) => {
    try {
      if (authToken) {
        const response = await axios.get(process.env.REACT_APP_GETUSER, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        const isAdmin = response.data.isAdmin;

        if (isAdmin === true) {
          console.log('verified');
          setIsLoggedin(true);
          navigate('/');
        } else {
          navigate('/login');
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      fetchUserData(authToken);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return (
    isLoggedin ? (
      <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Home />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/interview" element={<ProtectedRoute Component={Interview} />} />
          <Route path="/machine" element={<ProtectedRoute Component={Machine} />} />
          <Route path="/uiprac" element={<ProtectedRoute Component={UiPrac} />} />
          <Route path="/problem" element={<ProtectedRoute Component={Problem} />} />
          <Route path="/user" element={<ProtectedRoute Component={User} />} />
          <Route path="/quiz" element={<ProtectedRoute Component={Quiz} />} />
        </Routes>
      </Router>
      <ToastContainer />
      </div>
    ) : (
      <div className='preloader'>
        <img className='preloaderimg' src={Preloader} alt="preloader img" />
      </div>
    )
  );
}

function ProtectedRoute({ Component }) {
  useEffect(() => {
    // Any additional logic you want to execute for protected routes
  }, []);

  const authToken = localStorage.getItem('authToken');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const userData = localStorage.getItem('hasFetchedUserData') === 'true';
  const isAuthenticated = authToken !== null && isAdmin && userData;

  return isAuthenticated ? <Component /> : <Navigate to="/" />;
}

export default App;
