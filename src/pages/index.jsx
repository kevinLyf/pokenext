import Image from "next/image";
import React, { useState, useEffect } from "react";

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=251"
      );
      const data = await response.json();
      const results = data.results;

      const pokemonData = await Promise.all(
        results.map(async (pokemon) => {
          const response = await fetch(pokemon.url);
          const data = await response.json();
          const types = data.types.map((type) => type.type.name);

          return {
            id: data.id,
            name: data.name,
            types: types,
          };
        })
      );

      setPokemons(pokemonData);
    };

    fetchPokemons();
  }, []);

  function choiceType(type) {
    switch (type) {
      case "water":
        return "water";
      case "ice":
        return "ice";
      case "fire":
        return "fire";
      case "electric":
        return "electric";
      case "grass":
        return "grass";
      case "poison":
        return "poison";
      case "rock":
        return "rock";
      case "ground":
        return "ground";
      case "steel":
        return "steel";
      case "fairy":
        return "fairy";
      case "bug":
        return "bug";
      case "normal":
        return "normal";
      case "fighting":
        return "fighting";
      case "psychic":
        return "psychic";
      case "ghost":
        return "ghost";
      case "dark":
        return "dark";
      case "dragon":
        return "dragon";
      default:
        return "unknown";
    }
  }

  return (
    <div className="pokemon-wrapper">
      {pokemons.map((pokemon) => (
        <div
          className={`pokemon-card ${choiceType(pokemon.types[0])}`}
          key={pokemon.id}
        >
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            width={150}
            height={150}
            alt={pokemon.name}
          />
          <div className="my-4">
            <p className="text-2xl">{pokemon.name}</p>
          </div>
          <div className="pokemon-card-body">
            <p className="pokemon-card-id">{pokemon.id}</p>
            <div className="pokemon-card-wrapper">
              {pokemon.types.map((type) => (
                <p className="pokemon-card-type" key={type + pokemon.id}>
                  {type}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
