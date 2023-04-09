import React, { useState, useEffect } from "react";
import getType from "../hooks/getType";
import capitalize from "../hooks/capitalize";
import PokemonDetails from "../components/PokemonDetails";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [pokemonAmount, setPokemonAmount] = useState(16);
  const [isLoading, setIsLoading] = useState(false);
  const [pokemonName, setPokemonName] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const searchHandle = (e) => {
    e.preventDefault();
    setIsSearch(true);
  };

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

  return (
    <main>
      <section className="mx-auto max-w-7xl my-4 p-4 sm:px-6 lg:px-8">
        <PokemonDetails
          pokemonName={pokemonName}
          isSearch={isSearch}
          search={pokemonName}
          setIsSearch={setIsSearch}
        />
        <form onSubmit={searchHandle} className="mt-7">
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              placeholder="Enter a Pokemon name or id"
              className="input-search"
              required
            />
            <button type="submit" className="button-search">
              Search
            </button>
          </div>
        </form>
      </section>
      <section>
        <div className="pokemon-wrapper">
          {pokemons.map((pokemon) => (
            <Link
              className="w-full"
              href={`/pokemon/${pokemon.id}`}
              key={pokemon.id}
            >
              <div className={`pokemon-card ${getType(pokemon.types[0])}`}>
                <img
                  className="w-28 h-28"
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
                  alt={pokemon.name}
                />
                <div className="my-4">
                  <p className="truncate text-2xl">
                    {capitalize(pokemon.name)}
                  </p>
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
      </section>

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
