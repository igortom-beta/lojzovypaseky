import React from 'react';
import { FloatingChatWidget } from '../components/FloatingChatWidget';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navigace přesně podle obrázku */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter uppercase">LOJZOVY PASEKY</div>
          <div className="hidden md:flex items-center gap-8 text-[10px] font-bold tracking-widest">
            <a href="#projekt" className="hover:text-green-500 transition-colors">O PROJEKTU</a>
            <a href="#apartmany" className="hover:text-green-500 transition-colors">APARTMÁNY</a>
            <a href="#lokalita" className="hover:text-green-500 transition-colors">LOKALITA</a>
            <a href="#kontakt" className="hover:text-green-500 transition-colors">KONTAKT</a>
            <button className="bg-[#22c55e] text-white px-4 py-2 rounded-lg text-[10px] font-bold">
              Rezervovat
            </button>
          </div>
        </div>
      </nav>

      {/* Hero sekce s fotkou na pozadí */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Lojzovy Paseky"
          />
        </div>
        
        <div className="relative z-20 text-center px-6">
          <span className="text-[#22c55e] font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block">
            VÁŠ DRUHÝ DOMOV V SRDCI ŠUMAVY
          </span>
          <h1 className="text-6xl md:text-8xl font-serif mb-6">
            Lojzovy Paseky
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light italic">
            Kde se moderní architektura potkává s tichem lesů.  

            Investice do klidu, který trvá.
          </p>
        </div>
      </section>

      {/* AI Chat Widget - ten zelený vpravo */}
      <FloatingChatWidget />
    </div>
   );
};

export default Home;
