import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pokeballImage from './Poké_Ball_icon.svg-modified.png'; // Sostituisci con il percorso effettivo dell'immagine della Pokéball

const PokeballImage = ({ onClick }) => (
  <img src={pokeballImage} alt="Pokeball" style={{ width: '250px' }} onClick={onClick} />
);

const PokemonImage = ({ name }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [showPokemon, setShowPokemon] = useState(false);

  useEffect(() => {
    const fetchPokemonImage = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-form/${name.toLowerCase()}/`);

        // Verifica che la risposta contenga l'URL dell'immagine
        if (response.status === 200 && response.data.sprites && response.data.sprites.front_default) {
          setImageUrl(response.data.sprites.front_default);
        } else {
          console.error('Errore nel caricamento dell\'immagine del Pokémon.');
        }
      } catch (error) {
        console.error('Errore nella richiesta:', error);
      }
    };

    fetchPokemonImage();
  }, [name]);

  const handlePokemonClick = () => {
    setShowPokemon(!showPokemon);
  };

  return showPokemon ? (
    <img src={imageUrl} alt={name} style={{ width: '250px' }} onClick={handlePokemonClick} />
  ) : (
    <PokeballImage onClick={handlePokemonClick} />
  );
};

export default PokemonImage;