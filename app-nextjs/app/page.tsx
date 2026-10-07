import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 text-center bg-slate-900 text-white">
      <Image
        src="/pokeapi_256.3fa72200.png"
        alt="Logo Pokemon"
        width={300}
        height={150}
        className='mb-6 object-contain'
        priority
      />
      <p className="text-lg text-slate-250 max-w-md mb-8">
        <strong>Découvrez tous les Pokémon, leurs statistiques et leurs détails en direct. </strong>
      </p>
      
      <Link 
        href="/pokedex"
        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg shadow-lg transition"
      >
        Explorer le Pokédex ➔
      </Link>
    </main>
  );
}