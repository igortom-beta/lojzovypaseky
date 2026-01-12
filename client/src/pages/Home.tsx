import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { FloatingChatWidget } from "../components/FloatingChatWidget";

export default function Home() {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (audioRef.current && isMuted) {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
        setIsMuted(false);
      }
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction);
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div style={{ backgroundColor: '#0a0f16', minHeight: '100vh', color: '#ffffff', fontFamily: 'sans-serif' }}>
      <audio ref={audioRef} src="/morning-mood.mp3" loop />
      
      {/* Audio Toggle Button */}
      <button 
        onClick={toggleMute}
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          background: 'rgba(34, 197, 94, 0.2)',
          border: '1px solid #22c55e',
          color: '#22c55e',
          padding: '10px',
          borderRadius: '50%',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(5px)'
        }}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(10, 15, 22, 0.8)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ color: 'white', fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px' }}>
          LOJZOVY PASEKY
        </div>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#about" style={{ color: 'white', textDecoration: 'none', fontSize: '13px', opacity: 0.7, transition: 'opacity 0.3s' }}>O PROJEKTU</a>
          <a href="#apartments" style={{ color: 'white', textDecoration: 'none', fontSize: '13px', opacity: 0.7, transition: 'opacity 0.3s' }}>APARTMÁNY</a>
          <a href="#location" style={{ color: 'white', textDecoration: 'none', fontSize: '13px', opacity: 0.7, transition: 'opacity 0.3s' }}>LOKALITA</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontSize: '13px', opacity: 0.7, transition: 'opacity 0.3s' }}>KONTAKT</a>
          <button style={{
            background: '#22c55e',
            color: 'white',
            border: 'none',
            padding: '8px 20px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '13px'
          }}>
            Rezervovat
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: 'linear-gradient(rgba(10, 15, 22, 0.6), rgba(10, 15, 22, 0.9)), url("https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <div style={{ fontSize: '12px', letterSpacing: '4px', color: '#22c55e', marginBottom: '20px', fontWeight: 'bold' }}>
          VÁŠ DRUHÝ DOMOV V SRDCI ŠUMAVY
        </div>

        <h1 style={{ fontSize: '5em', fontWeight: 'bold', marginBottom: '10px', letterSpacing: '1px' }}>
          Lojzovy Paseky
        </h1>

        <p style={{ fontSize: '1.4em', marginBottom: '40px', opacity: 0.8, maxWidth: '800px', lineHeight: '1.5' }}>
          Kde se moderní architektura potkává s tichem lesů.<br />
          Investice do klidu, který trvá.
        </p>
      </div>

      {/* Content Sections */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 20px' }}>
        <section id="about" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#22c55e' }}>O Projektu</h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', opacity: 0.8 }}>
            Lojzovy Paseky je unikátní projekt moderních bungalovů v srdci Šumavy u Lipna nad Vltavou. 
            Kombinuje luxusní bydlení s přírodou a nabízí ideální podmínky pro rodiny, digitální nomády i investory.
          </p>
        </section>

        <section id="apartments" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#22c55e' }}>Apartmány</h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', opacity: 0.8 }}>
            Naše apartmány jsou navrženy s důrazem na komfort a moderní design. 
            Každý bungalov nabízí výhled na přírodu a přímý přístup k lesu.
          </p>
        </section>

        <section id="location" style={{ marginBottom: '100px' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#22c55e' }}>Lokalita</h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', opacity: 0.8 }}>
            Lipno nad Vltavou je ideální destinace pro odpočinek a aktivní trávení volného času. 
            Blízkost přírody, vodních sportů a kulturních atraktivit.
          </p>
        </section>

        <section id="contact">
          <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#22c55e' }}>Kontakt</h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', opacity: 0.8 }}>
            Email: <a href="mailto:info@lojzovypaseky.life" style={{ color: '#22c55e', textDecoration: 'none' }}>info@lojzovypaseky.life</a>
          </p>
        </section>
      </div>

      <FloatingChatWidget />
    </div>
  );
}
