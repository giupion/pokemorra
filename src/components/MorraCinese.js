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

  const handleUserChoice = (chosenPokemon) => {
    setUserChoice(chosenPokemon);
  };

  const handleComputerChoice = () => {
    const compChoice = pokemons[Math.floor(Math.random() * pokemons.length)];
    setComputerChoice(compChoice);
  };

  const handleNewGame = () => {
    setUserChoice(null);
    setComputerChoice(null);
  };

  const determineOutcome = () => {
    if (userChoice.type === computerChoice.type) {
      return 'Pareggio!';
    } else if (
      (userChoice.type === 'fire' && computerChoice.type === 'grass') ||
      (userChoice.type === 'water' && computerChoice.type === 'fire') ||
      (userChoice.type === 'grass' && computerChoice.type === 'water')
    ) {
      return 'Hai Vinto!';
    } else {
      return 'Hai Perso!';
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
      </div>
      <div className="slider-column">
        <h1>
          {userChoice && computerChoice && <h2>{determineOutcome()}</h2>}
        </h1>
      </div>
      <div className="slider-column">
        <Slider {...settings}>
          {pokemons.map((pokemon, index) => (
            <div key={index} className="pokemon-slide">
              <PokemonImage name={pokemon.name.toLowerCase()} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MorraCinese;
