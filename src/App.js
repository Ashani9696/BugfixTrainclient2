import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TrainList from './components/TrainList';
import TrainMap from './components/TrainDetail';
import TrainDetail from './components/TrainDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Train Tracking System</h1>
        <Routes>
          <Route path="/" element={<TrainList />} />
          <Route path="/train/:id" element={<TrainDetail />} />
          <Route path="/map/:id" element={<TrainMap />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
