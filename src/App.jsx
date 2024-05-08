import React from 'react';
import Dice from './Dice';
import LuckyN from './LuckyN';


function App() {
  const prova = [3,6];
  return (
    <div className="App">
      <LuckyN numDaus={2} suma={7}/>
    </div>
  );
}

export default App;
