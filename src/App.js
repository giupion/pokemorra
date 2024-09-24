import React from 'react';
import MorraCinese from './components/MorraCinese';
import './App.css';
import backgroundImage from './components/_2ae73e80-31d5-44c5-a55b-adce8d0914e4.jpg'; // Assicurati che il percorso sia corretto

function App() {
  return (
    <div 
      className="App" 
      style={{ 
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        height: '100vh', 
        color: 'white' // Modifica il colore del testo per una migliore leggibilità
      }}
    >
      <MorraCinese />
    </div>
  );
}

export default App;
