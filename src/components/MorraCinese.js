import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import PokemonImage from './PokemonImage'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  focusOnSelect: true,
  autoplay: true,
  autoplaySpeed: 1000,
  pauseOnHover: false,
  cssEase: 'cubic-bezier(0.645, 0.045, 0.355, 1)', // Easing per un effetto slot machine
};

const PokemonSection = ({ title, pokemons, onPokemonSelect, interactive }) => {
  const [sliderIndex, setSliderIndex] = useState(0);
  const sliderRef = useRef(null);

  const handleClick = (pokemon) => {
    if (interactive && sliderRef.current) {
      onPokemonSelect(pokemon);
      sliderRef.current.slickPause(); // Pausa lo slider al clic
    }
  };

  return (
    <div className="pokemon-section">
      <h2>{title}</h2>
      <Slider {...settings} afterChange={(current) => setSliderIndex(current)} ref={sliderRef}>
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            className={`pokemon-slide ${sliderIndex === index ? 'selected' : ''}`}
            onClick={() => handleClick(pokemon)}
          >
            <PokemonImage name={pokemon.name.toLowerCase()} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

const MorraCinese = () => {
  const pokemons = [
    { name: 'Charmander', type: 'fire' },
    { name: 'Squirtle', type: 'water' },
    { name: 'Bulbasaur', type: 'grass' },
  ];

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState(''); // Stato per il risultato

  const handleUserChoice = (chosenPokemon) => {
    setUserChoice(chosenPokemon);
    setResult(''); // Resetta il risultato quando si fa una scelta
  };

  const handleComputerChoice = () => {
    const compChoice = pokemons[Math.floor(Math.random() * pokemons.length)];
    setComputerChoice(compChoice);
    determineOutcome(userChoice, compChoice); // Determina l'esito solo dopo che entrambi i Pokémon sono stati rivelati
  };

  const handleNewGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
    setResult(''); // Resetta il risultato per un nuovo gioco
  };

  const determineOutcome = (user, computer) => {
    if (!user || !computer) return; // Se i Pokémon non sono stati rivelati, non mostrare niente
    if (user.type === computer.type) {
      setResult('Pareggio!');
    } else if (
      (user.type === 'fire' && computer.type === 'grass') ||
      (user.type === 'water' && computer.type === 'fire') ||
      (user.type === 'grass' && computer.type === 'water')
    ) {
      setResult('Hai Vinto!');
    } else {
      setResult('Hai Perso!');
    }
  };

  return (
    <div className="morra-cinese">
      <h1>PokéMorra!</h1>
      <div className="slider-column">
        <PokemonSection title="Scegli il tuo Pokèmon!" pokemons={pokemons} onPokemonSelect={handleUserChoice} interactive />
      </div>
      <div className="result-column">
        <h3>La tua Scelta</h3>
        {userChoice && (
          <div className="chosen-pokemon">
            <PokemonImage name={userChoice.name.toLowerCase()} />
          </div>
        )}
        <div className="button-container">
          <button onClick={handleNewGame}>Nuovo Gioco!</button>
          <button onClick={handleComputerChoice}>Gioca col computer!</button>
        </div>
        {computerChoice && (
          <div className="chosen-pokemon">
            <PokemonImage name={computerChoice.name.toLowerCase()} />
          </div>
        )}
        <h3>Scelta del Computer</h3>
        {result && <h2>{result}</h2>} {/* Mostra l'esito solo se è stato determinato */}
      </div>
    </div>
  );
};

export default MorraCinese;
