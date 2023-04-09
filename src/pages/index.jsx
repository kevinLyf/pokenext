import Image from "next/image";
import React, { useState, useEffect } from "react";
import getType from "../hooks/getType";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonAmount, setPokemonAmount] = useState(16);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${pokemonAmount}`
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
      setIsLoading(false);
    };

    fetchPokemons();
  }, [pokemonAmount]);

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <main>
      <div className="pokemon-wrapper">
        {pokemons.map((pokemon) => (
          <Link className="w-full" href={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <div
              className={`pokemon-card ${getType(pokemon.types[0])}`}
            >
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                width={150}
                height={150}
                alt={pokemon.name}
              />
              <div className="my-4">
                <p className="truncate text-2xl">{capitalize(pokemon.name)}</p>
              </div>
              <div className="pokemon-card-body">
                <p className="pokemon-card-id">{pokemon.id}</p>
                <div className="pokemon-card-wrapper">
                  {pokemon.types.map((type, index) => (
                    <p
                      className={`pokemon-card-type ${getType(
                        pokemon.types[index]
                      )}`}
                      key={type + pokemon.id}
                    >
                      {type}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="div-btn-load">
        <button
          className="btn-load"
          onClick={() => setPokemonAmount((amount) => amount + 20)}
          disabled={isLoading}
        >
          {isLoading ? (
            <ThreeDots
              height="28"
              width="28"
              radius="9"
              color="#fff"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          ) : (
            "Load More"
          )}
        </button>
      </div>
    </main>
  );
}

export default App;
