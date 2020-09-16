import React from 'react';
import CovidTracker from './components/CovidTracker';
//import LineChart from './components/LineChart';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <div className="chart">
        <LineChart />
      </div> */}
      <CovidTracker />
    </div>
  )
}

export default App;
