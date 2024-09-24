import React from 'react';
import MorraCinese from './components/MorraCinese';
import backgroundImage from './components/_2ae73e80-31d5-44c5-a55b-adce8d0914e4.jpg'; // Non è necessario importare l'immagine se la utilizzi nello stile

function App() {
  const appStyle = {
    margin: 0,
    padding: 0,
    fontFamily: 'Arial, sans-serif',
    backgroundImage: `url(${backgroundImage})`, // Usa la variabile importata
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    overflow: 'hidden', // Altezza intera della finestra
  };

  return (
    <div className="App" style={appStyle}>
      <MorraCinese />
    </div>
  );
}

export default App;
