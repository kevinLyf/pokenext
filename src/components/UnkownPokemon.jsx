export default function UnknownPokemon() {
  return (
    <div className="pokemon-card unknown">
      <img
        className="w-auto h-28"
        src="/images/unknown-pokemon.png"
        alt="unknown pokemon"
      />
      <div className="my-4">
        <p className="truncate text-2xl">unknown</p>
      </div>

      <div className="pokemon-card-body">
        <p className="pokemon-card-id">unknown</p>

        <div className="pokemon-card-wrapper">
          <p className="pokemon-card-type unknown">unknown</p>
        </div>
      </div>
    </div>
  );
}
