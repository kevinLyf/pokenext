export default function About() {
  return (
    <main className="mx-auto max-w-7xl my-4 p-4 sm:px-6 lg:px-8">
      <img
        className="w-full sm:h-96"
        src="/gifs/pikachu-suprised.gif"
        alt="pokemon gif"
      />
      <div className="mt-5">
        <h1 className="text-2xl text-slate-800">Hello Everyone!</h1>
        <p className="mt-2 sm:text-xl text-slate-700">
          I created this Pokédex using Next.js and Tailwind CSS. To populate the
          Pokédex with data, I used the PokeAPI API. By using the PokeAPI API, I
          was able to get all the information I needed for each Pokemon,
          including name, type, and stats. This information has been organized
          and displayed on the Pokédex page, allowing users to easily navigate
          and learn more about each Pokémon. Overall, building a Pokédex using
          Next.js and Tailwind CSS was a fun and rewarding project. It allowed
          me to showcase my web development skills while satisfying my thirst
          for knowledge.😎
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <a href="https://github.com/kevinLyf" target="_blank">
          <img src="/images/github.svg" alt="github logo" />
        </a>
        <a href="https://www.instagram.com/kevinlyrc/" target="_blank">
          <img src="/images/instagram.svg" alt="instagram logo" />
        </a>
      </div>
    </main>
  );
}
