'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Pokemon {
  name: string;
  url: string;
  id: number;
}

export default function PokedexPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // récupération des 251 premiers pokemons
  useEffect(() => {
    async function fetchPokemon() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=251');
      const data = await res.json();
      
      const formatted = data.results.map((p: { name: string; url: string }, index: number) => ({
        ...p,
        id: index + 1,
      }));

      setPokemonList(formatted);
      setLoading(false);
    }

    fetchPokemon();
  }, []);

 
  // filtrage dynamique pour la barre de recherche
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
    pokemon.id.toString().includes(search)
  );

  return (
    <main className="min-h-screen p-8 bg-slate-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-yellow-400">
        Pokédex (Gen 1 & 2)
      </h1>

      <div className="max-w-md mx-auto mb-10">
        <input
          type="text"
          placeholder="Rechercher par nom ou numéro"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 transition"
        />
      </div>

      {loading ? (
        <p className="text-center text-slate-400">Chargement des Pokémon...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {filteredPokemon.map((pokemon) => {
            const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
            //`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`;   test mais ne fonctionne pas

            return (
              <Link
                key={pokemon.name}
                href={`/cartes/${pokemon.id}`}
                className="bg-slate-800 p-4 rounded-xl flex flex-col items-center hover:scale-105 transition border border-slate-700 hover:border-yellow-400"
              >
                <img src={imageUrl} alt={pokemon.name} className="w-24 h-24 object-contain mb-2" />
                <span className="text-xs text-slate-400">#{pokemon.id.toString().padStart(3, '0')}</span>
                <p className="capitalize font-semibold text-slate-200">{pokemon.name}</p>
              </Link>
            );
          })}
        </div>
      )}

      {!loading && filteredPokemon.length === 0 && (
        <p className="text-center text-slate-400 mt-8">
          Aucun Pokémon ne correspond à votre recherche.
        </p>
      )}
    </main>
  );
}