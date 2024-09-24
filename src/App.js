import React from 'react';
import MorraCinese from './components/MorraCinese';
import backgroundImage from './components/_2ae73e80-31d5-44c5-a55b-adce8d0914e4.jpg'; // Assicurati di avere il percorso corretto

function App() {
  return (
    <div 
      className="App" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
      }}
    >
      <MorraCinese />
    </div>
  );
}

export default App;
