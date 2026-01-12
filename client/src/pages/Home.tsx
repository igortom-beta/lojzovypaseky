import { useState } from "react";
import { FloatingChatWidget } from "../components/FloatingChatWidget";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', color: '#1a3a5f', fontFamily: 'sans-serif' }}>
      {/* Navigation Bar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>
          LOJZOVY PASEKY
        </div>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <a href="#about" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', opacity: 0.8, transition: 'opacity 0.3s' }}>O PROJEKTU</a>
          <a href="#apartments" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', opacity: 0.8, transition: 'opacity 0.3s' }}>APARTMÁNY</a>
          <a href="#location" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', opacity: 0.8, transition: 'opacity 0.3s' }}>LOKALITA</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontSize: '14px', opacity: 0.8, transition: 'opacity 0.3s' }}>KONTAKT</a>
          <button style={{
            background: '#22c55e',
            color: 'white',
            border: 'none',
            padding: '10px 25px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '14px',
            transition: 'background 0.3s'
          }}>
            Rezervovat
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        position: 'relative',
        height: '100vh',
        background: 'linear-gradient(135deg, rgba(26, 58, 95, 0.7) 0%, rgba(15, 37, 64, 0.8) 100%), url(/images/hero-bungalow-exterior.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        paddingTop: '80px'
      }}>
        {/* Green accent text */}
        <div style={{
          fontSize: '14px',
          letterSpacing: '4px',
          color: '#22c55e',
          marginBottom: '20px',
          fontWeight: 'bold'
        }}>
          VÁŠ DRUHÝ DOMOV V SRDCI ŠUMAVY
        </div>

        {/* Main heading */}
        <h1 style={{
          fontSize: '4em',
          fontWeight: 'bold',
          marginBottom: '20px',
          letterSpacing: '1px',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)'
        }}>
          Lojzovy Paseky
        </h1>

        {/* Subheading */}
        <p style={{
          fontSize: '1.5em',
          marginBottom: '40px',
          opacity: 0.95,
          maxWidth: '700px',
          lineHeight: '1.6',
          textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)'
        }}>
          Kde se moderní architektura potkává s tihem lesů.<br />
          Investice do klidu, který trvá.
        </p>

        {/* CTA Button */}
        <button style={{
          background: '#22c55e',
          color: 'white',
          border: 'none',
          padding: '16px 40px',
          fontSize: '18px',
          fontWeight: 'bold',
          borderRadius: '8px',
          cursor: 'pointer',
          transition: 'all 0.3s',
          boxShadow: '0 8px 20px rgba(34, 197, 94, 0.3)',
          marginTop: '20px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#16a34a';
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 25px rgba(34, 197, 94, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = '#22c55e';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(34, 197, 94, 0.3)';
        }}>
          Spustit chat
        </button>
      </div>

      {/* About Section */}
      <section id="about" style={{
        padding: '80px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#1a3a5f' }}>O Projektu</h2>
        <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
          Lojzovy Paseky je unikátní projekt moderních bungalovů v srdci Šumavy u Lipna nad Vltavou. 
          Kombinuje luxusní bydlení s přírodou a nabízí ideální podmínky pro rodiny, digitální nomády i investory.
        </p>
      </section>

      {/* Apartments Section */}
      <section id="apartments" style={{
        padding: '80px 40px',
        background: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#1a3a5f' }}>Apartmány</h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#555' }}>
            Naše apartmány jsou navrženy s důrazem na komfort a moderní design. 
            Každý bungalov nabízí výhled na přírodu a přístup k přírodě.
          </p>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" style={{
        padding: '80px 40px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#1a3a5f' }}>Lokalita</h2>
        <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#555' }}>
          Lipno nad Vltavou je ideální destinace pro odpočinek a aktivní trávení volného času. 
          Blízkost přírody, vodních sportů a kulturních atraktivit.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" style={{
        padding: '80px 40px',
        background: '#f4f7f6'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5em', marginBottom: '30px', color: '#1a3a5f' }}>Kontakt</h2>
          <p style={{ fontSize: '1.1em', lineHeight: '1.8', color: '#555' }}>
            Email: <a href="mailto:info@lojzovypaseky.life" style={{ color: '#22c55e', textDecoration: 'none' }}>info@lojzovypaseky.life</a>
          </p>
        </div>
      </section>

      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
}
