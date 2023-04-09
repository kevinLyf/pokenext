import Image from "next/image";

export async function getStaticProps() {
  const maxPokemons = 23;
  const api = "https://pokeapi.co/api/v2/pokemon";

  const res = await fetch(`${api}/?limit=${maxPokemons}`);
  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Home({ pokemons }) {
  return (
    <>
      <div className="mx-auto max-w-7xl grid place-items-center gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 sm:px-6 lg:px-8">
        {pokemons.map((pokemon) => (
          <div
            className="w-11/12 sm:w-full h-full flex items-center justify-center flex-col p-4 bg-red-500 text-white rounded"
            key={pokemon.id}
          >
            <div className="flex align-middle justify-center">
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                width="130"
                height="130"
                alt={pokemon.name}
              />
            </div>
            <div className="flex gap-4 items-center justify-center">
              <span className="text-2xl">{pokemon.id}</span>
              <h3 className="text-2xl">{pokemon.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
