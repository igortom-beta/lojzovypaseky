import { FloatingChatWidget } from "../components/FloatingChatWidget";

export default function Home() {
  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', color: '#1a3a5f', fontFamily: 'sans-serif', textAlign: 'center' }}>
      {/* Tvůj Hero panel */}
      <div style={{ background: '#1a3a5f', color: 'white', padding: '50px 20px' }}>
        <h1 style={{ fontSize: '2.5em', marginBottom: '10px' }}>Lojzovy Paseky</h1>
        <p style={{ fontSize: '1.2em', opacity: 0.9 }}>Bungalovy u Lipna & Investiční příležitosti</p>
      </div>
      
      {/* Tvůj bílý kontejner */}
      <div style={{ maxWidth: '800px', margin: '-30px auto 40px', padding: '40px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '15px' }}>Rezervace ubytování</h2>
        <p style={{ marginBottom: '20px', lineHeight: '1.6' }}>
          Vítejte! Náš AI asistent vpravo dole vám spočítá cenu v Kč i EUR.
        </p>
        <a href="mailto:info@lojzovypaseky.life" style={{ background: '#28a745', color: 'white', padding: '15px 30px', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold', display: 'inline-block', fontSize: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
          REZERVOVAT TEĎ
        </a>
      </div>

      {/* Nový asistent s tvými bublinami */}
      <FloatingChatWidget 
        suggestions={[
          "Kolik stojí měsíční nájem?",
          "Jaký je kurz EUR/CZK?",
          "Chci si domluvit prohlídku"
        ]}
      />
    </div>
  );
}
