import React from 'react';
import AddPlant from './Addplant';
import PlantList from './Plantlist';
import CareLog from './Carelog';

function App() {
  return (
    <div className="App">
      <h1>Plant Care Scheduler</h1>
      <AddPlant />
      <PlantList />
      <CareLog />
    </div>
  );
}

export default App;
