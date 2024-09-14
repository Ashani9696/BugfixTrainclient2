import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MyMap from "./map";

function TrainDetail() {
  const [train, setTrain] = useState(null);
  const [path, setPath] = useState([]);
  const [currentLocation, setCurrentLocation] = useState([]);
  const [newEngineId, setNewEngineID] = useState("");

  const { id } = useParams();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleChange = () => {
    console.log(newEngineId);

    axios
      .post(`${backendUrl}/api/trains/switch-engine/${id}`, {
        newEngineId: newEngineId, // Send the new engine ID in the request body
      })
      .then((response) => {
        console.log("Engine switched successfully:", response.data);
        setNewEngineID(""); // Clear the newEngineId state after successful response
      })
      .catch((error) => {
        console.error("Error switching engine:", error);
      });
  };

  useEffect(() => {
    // Fetch train details from the backend
    axios
      .get(`${backendUrl}/api/trains/get/${id}`)
      .then((response) => {
        setTrain(response.data);
        console.log(response.data);
        
        setPath(response.data.path);
        // const currentLocation = response.data.currentLocation;
        // const newLocation = [
        //   currentLocation.latitude,
        //   currentLocation.longitude,
        // ];
        setCurrentLocation(response.data.currentLocation);
      })
      .catch((error) => console.error("Error fetching train details:", error));

    // Set an interval to update the location every minute
    const interval = setInterval(() => {
      axios
        .get(`${backendUrl}/api/trains/get/${id}`)
        .then((response) => {
          // const currentLocation = response.data.currentLocation;
          // const newLocation = [
          //   currentLocation.latitude,
          //   currentLocation.longitude,
          // ];
          setCurrentLocation(response.data.currentLocation);
        })
        .catch((error) =>
          console.error("Error fetching train details:", error)
        );
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [id]);

  if (!train) return <div>Loading...</div>;

  return (
    <div>
      <h2>Train Details - {train.route}</h2>
      <h3>Engine History</h3>
      <ul>
        {train.engineHistory.map((engine, index) => (
          <li key={index}>
            <strong>Engine ID:</strong> {engine.engineId} <br />
            <strong>Detached At:</strong>{" "}
            {engine.detachedAt
              ? new Date(engine.detachedAt).toLocaleString()
              : "Still Active"}{" "}
            <br />
            {engine.current && <strong>Current Engine - {train.route}</strong>}
          </li>
        ))}
      </ul>
      <h3>Change the Engine</h3>
      <form>
        <input
          type="text"
          value={newEngineId}
          onChange={(e) => setNewEngineID(e.target.value)}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleChange} type="button">
          Change Engine
        </button>
      </form>
      <br></br>
      <div style={{ width: "50%", height: "50%" }}>
        <MyMap
          key={id}
          path={path}
          markers={path}
          currentLocation={currentLocation}
        />
      </div>
    </div>
  );
}

export default TrainDetail;
