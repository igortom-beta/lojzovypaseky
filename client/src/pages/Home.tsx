import { FloatingChatWidget } from "@/components/FloatingChatWidget";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* 1. SEKCE S BUNGALOVEM (To vaše krásno) */}
      <div className="relative h-screen w-full">
        <img 
          src="/images/hero-bungalow-exterior.jpg" 
          className="w-full h-full object-cover brightness-50"
          alt="Bungalov Lojzovy Paseky" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-5xl md:text-8xl font-serif mb-4 tracking-tight">Lojzovy Paseky</h1>
          <p className="text-white text-lg md:text-xl tracking-[0.3em] uppercase opacity-80">
            Investice do klidu, který trvá
          </p>
          <div className="mt-10">
            <a href="mailto:rezervace@timola.cz" className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-full text-sm uppercase tracking-widest transition-all">
              Rezervovat teď
            </a>
          </div>
        </div>
      </div>

      {/* 2. CHYTRÝ ASISTENT (Ten váš inteligentní mozek) */}
      <FloatingChatWidget />
    </div>
  );
}
