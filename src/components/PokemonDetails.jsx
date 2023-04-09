import React, { useState, useEffect } from "react";
import capitalize from "../hooks/capitalize";
import getType from "@/hooks/getType";

function PokemonDetails({ pokemonName, isSearch, setIsSearch }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    if (isSearch) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => setPokemonData(data))
        .catch((error) => console.error(error));

      setIsSearch(false);
    }
  }, [pokemonName, isSearch]);

  if (!pokemonData) {
    return <div>Loading...</div>;
  }

  const types = pokemonData.types.map((type) => (
    <p
      className={`pokemon-card-type ${getType(type.type.name)}`}
      key={type + pokemonData.id}
    >
      {type.type.name}
    </p>
  ));

  return (
    <div className="w-full">
      <div
        className={`pokemon-card ${getType(pokemonData.types[0].type.name)}`}
      >
        <img
          className="w-auto h-28"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemonData.id}.gif`}
          alt={pokemonData.name}
        />

        <div className="my-4">
          <p className="truncate text-2xl">{capitalize(pokemonData.name)}</p>
        </div>

        <div className="pokemon-card-body">
          <p className="pokemon-card-id">{pokemonData.id}</p>

          <div className="pokemon-card-wrapper">
            <p
              className={`pokemon-card-type ${getType(
                pokemonData.types[0].type.name
              )}`}
            >
              {pokemonData.types[0].type.name}
            </p>

            {pokemonData.types[1]?.type.name && (
              <p
                className={`pokemon-card-type ${getType(
                  pokemonData.types[1].type.name
                )}`}
              >
                {pokemonData.types[1].type.name}
              </p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
