import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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

        // Assuming the response has an 'isAdmin' property
        const isAdmin = response.data.isAdmin;

        if (isAdmin === true) {
          setLoading(false);
          console.log('verified')
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
    fetchUserData();
  }, []); 

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Dashboard</h1>
          {/* Your dashboard content here */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
