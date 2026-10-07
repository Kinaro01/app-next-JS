import Link from 'next/link';

// requete pour récupérer toutes les données d'un pokemon
async function getPokemonDetail(id: string) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Pokémon non trouvé');
  return res.json();
}

export default async function DetailCarte({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonDetail(id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-slate-900 text-white">
      <Link href="/pokedex" className="text-yellow-400 hover:underline mb-6">
        ← Retour au Pokédex
      </Link>

      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 max-w-md w-full flex flex-col items-center">
        <span className="text-slate-400 font-bold">#{pokemon.id.toString().padStart(3, '0')}</span>
        <h1 className="text-4xl font-extrabold capitalize text-yellow-400 my-2">
          {pokemon.name}
        </h1>

        <div className="flex flex-row justify-center gap-4 my-4">
                <img
                    src={pokemon.sprites.other['official-artwork'].front_default}
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain my-4"
                />
                <img
                    src={pokemon.sprites.other['official-artwork'].front_shiny}
                    alt={pokemon.name}
                    className="w-48 h-48 object-contain my-4"
                />
        </div>

        {/*Création d'une map pour parcourir tous les éléments du tableau */}
        <div className="flex gap-2">
          {pokemon.types.map((t: any) => (
            <span key={t.type.name} className="bg-slate-700 px-3 py-1 rounded-full text-sm font-semibold capitalize">
              {t.type.name}
            </span>
          ))}
        </div>

        {/*Compétences*/}
        <div className="mt-6 w-full">
        <h2 className="text-xl font-bold mb-3 border-b border-slate-700 pb-1">
            Compétences / Talents
        </h2>

        <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.abilities.map((item: any) => (
            <span
                key={item.ability.name}
                className="bg-slate-700 text-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold capitalize"
            >
                {item.ability.name.replace('-', ' ')}
                {item.is_hidden && <span className="text-xs text-slate-400 ml-1">(A débloquer)</span>}
            </span>
            ))}
        </div>
    </div>

      {/*Statistiques*/}
     <div className="mt-6 w-full">
        <h2 className="text-xl font-bold mb-3 border-b border-slate-700 pb-1">
            Statistiques
        </h2>

        <div className="flex flex-wrap gap-2 justify-center">
            {pokemon.stats.map((item: any) => (
            <span
                key={item.stat.name}
                className="bg-slate-700 text-yellow-400 px-3 py-1 rounded-lg text-sm font-semibold capitalize"
            >
              <span className="text-slate-400 mr-1">{item.stat.name} :</span>
              <strong className="text-yellow-400">{item.base_stat}</strong>
            </span>
            ))}
        </div>
    </div>
</div>
</main>
  );
}