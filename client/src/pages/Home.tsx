import { FloatingChatWidget } from "../components/FloatingChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. TVŮJ PŮVODNÍ DESIGN (Tady zůstává vše, co jsi tam měl) */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4 text-blue-900">Lojzovy Paseky</h1>
          <p className="text-xl text-gray-700 mb-8">Luxusní ubytování u Lipna</p>
          
          {/* SEM MŮŽEŠ POZDĚJI VLOŽIT SVÉ FOTKY A DALŠÍ SEKCE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Bungalov A</h2>
              <p>Ideální pro rodiny s dětmi.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">Bungalov B</h2>
              <p>Soukromí a klid v přírodě.</p>
            </div>
          </div>
        </div>
      </main>

      {/* 2. TVŮJ NOVÝ ASISTENT (To zelené tlačítko v rohu) */}
      <FloatingChatWidget />
      
      {/* 3. PATIČKA */}
      <footer className="bg-blue-900 text-white p-4 text-center">
        <p>© 2025 Lojzovy Paseky - Milovice nad Labem & Lipno</p>
      </footer>
    </div>
  );
}
