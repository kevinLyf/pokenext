import capitalize from "@/hooks/capitalize";
import getType from "@/hooks/getType";

export async function getStaticPaths() {
  const maxPokemons = 1008;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${maxPokemons}`);
  const data = await res.json();

  const paths = data.results.map((pokemon, index) => {
    return {
      params: { pokemonId: (index + 1).toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.pokemonId;

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  return {
    props: { pokemon: data },
  };
}

export default function PokemonId({ pokemon }) {
  console.log(pokemon);
  return (
    <main>
      <section className="mx-auto max-w-7xl my-4 p-4 sm:px-6 lg:px-8">
        <div className={`pokemon-card ${getType(pokemon.types[0].type.name)}`}>
          <img
            className="w-28 h-28"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${pokemon.id}.gif`}
            onError={(e) =>
              (e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`)
            }
            alt={pokemon.name}
          />
          <div className="w-full my-4">
            <p className="truncate text-center text-2xl">
              {capitalize(pokemon.name)}
            </p>
          </div>
          <div className="pokemon-card-body">
            <p className="pokemon-card-id">{pokemon.id}</p>
            <div className="pokemon-card-wrapper">
              <div className="pokemon-card-wrapper">
                <p
                  className={`pokemon-card-type ${getType(
                    pokemon.types[0].type.name
                  )}`}
                >
                  {pokemon.types[0].type.name}
                </p>

                {pokemon.types[1]?.type.name && (
                  <p
                    className={`pokemon-card-type ${getType(
                      pokemon.types[1].type.name
                    )}`}
                  >
                    {pokemon.types[1].type.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="py-8">
          <h1 className="font-medium text-xl text-slate-600">Status</h1>

          <div className="flex flex-col gap-1">
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xl mt-4">
              <div className="flex items-center justify-start gap-4">
                <p className="sm:w-36 text-md text-slate-500 font-medium">HP</p>
                <span className="font-medium text-slate-600">
                  {pokemon.stats[0].base_stat}
                </span>
              </div>

              <div className="w-full sm:w-7/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 sm:mt-0">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{
                    width:
                      pokemon.stats[0].base_stat <= 100
                        ? pokemon.stats[0].base_stat + "%"
                        : "100%",
                  }}
                ></div>
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xl mt-4">
              <div className="flex items-center justify-start gap-4">
                <p className="sm:w-36 text-md text-slate-500 font-medium">
                  Attack
                </p>
                <span className="font-medium text-slate-600">
                  {pokemon.stats[1].base_stat}
                </span>
              </div>

              <div className="w-full sm:w-7/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 sm:mt-0">
                <div
                  className="bg-red-500 h-2.5 rounded-full"
                  style={{
                    width:
                      pokemon.stats[1].base_stat <= 100
                        ? pokemon.stats[1].base_stat + "%"
                        : "100%",
                  }}
                ></div>
              </div>
            </div>

            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xl mt-4">
              <div className="flex items-center justify-start gap-4">
                <p className="sm:w-36 text-md text-slate-500 font-medium">
                  Defense
                </p>
                <span className="font-medium text-slate-600">
                  {pokemon.stats[2].base_stat}
                </span>
              </div>

              <div className="w-full sm:w-7/12 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 sm:mt-0">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{
                    width:
                      pokemon.stats[2].base_stat <= 100
                        ? pokemon.stats[2].base_stat + "%"
                        : "100%",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
