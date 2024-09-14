import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TrainList.css';

const TrainList = () => {
  const [trains, setTrains] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/trains/get`);
        console.log(response);
        
        setTrains(response.data);
      } catch (error) {
        console.error('Error fetching trains:', error);
      }
    };

    fetchTrains();
  }, []);

  return (
    <div className="train-list">
      {trains.map((train) => (
        <div key={train._id} className="train-item">
          <Link to={`/train/${train._id}`}>
            <img src="/train-icon.png" alt="Train Icon" />
            <p>{train.route}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default TrainList;
