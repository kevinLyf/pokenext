export default function UnknownPokemon() {
  return (
    <div className="pokemon-card unknown">
      <img
        className="w-auto h-28"
        src="https://o.remove.bg/downloads/9f9f3e53-d63f-4077-8c63-945be92fe1aa/image-removebg-preview.png"
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
