import React from 'react';
import MorraCinese from './components/MorraCinese';
import backgroundImage from './components/_2ae73e80-31d5-44c5-a55b-adce8d0914e4.jpg';

function App() {
  const appStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover', // Copre l'intera area
    backgroundPosition: 'center', // Centro dell'immagine
    height: '100vh', // Altezza intera della finestra
  };

  return (
    <div className="App" style={appStyle}>
      <MorraCinese />
    </div>
  );
}

export default App;
