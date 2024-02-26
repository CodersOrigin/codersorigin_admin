import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Preloader from "../src/image/preloader.gif";
import Header from './components/Header';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        const response = await axios.get(process.env.REACT_APP_GETUSER, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

     
        const isAdmin = response.data.isAdmin;

        if (isAdmin === true) {
          setLoading(false);
          console.log('verified');
          localStorage.setItem('isAdmin', response.data.isAdmin);
          localStorage.setItem('hasFetchedUserData', true);
        } else {
          navigate('/login');
        }
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/login');
    }
  };

  useEffect(() => {
    const hasFetchedUserData = localStorage.getItem('hasFetchedUserData');
    if (!hasFetchedUserData) {
      fetchUserData();
     
    }

    else{
      setLoading(false)
    }
  }, []); 

  return (
    <div>
      {loading ? (
        <div className='preloader'>
          <img className='preloaderimg' src={Preloader} alt="preloader img" />
        </div>
      ) : (
        <div className='dashboard'>
          <Header />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
