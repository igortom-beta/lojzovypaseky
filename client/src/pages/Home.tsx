import { Button } from "@/components/ui/button";
import { ChevronRight, Leaf, Heart, Zap, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage, translations, Language, Variant } from "@/contexts/LanguageContext";
import Reviews from "@/components/Reviews";
import Attractions from "@/components/Attractions";
import { AIReservationWidget } from "@/components/AIReservationWidget";

/**
 * Design Philosophy: Organic Minimalism with Nature Focus
 * - Sage green primary (#6B8E6F) for nature connection
 * - Warm cream backgrounds (#F5F1E8) for calm, welcoming feel
 * - Warm orange accents (#E8956E) for energy and family warmth
 * - Asymmetric layouts and organic spacing
 * - Typography: Playfair Display for headings, Inter for body
 */

export default function HomePage() {
  const { language, setLanguage, variant, setVariant } = useLanguage();
  const t = translations[language][variant];
  const [activeTab, setActiveTab] = useState("features");

  return (
    <div className="min-h-screen bg-white">
      {/* Top Control Bar */}
      <div className="bg-[#F5F1E8] border-b border-gray-200">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap gap-4">
          <div className="flex gap-2">
            <button
              onClick={() => setVariant("families")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                variant === "families"
                  ? "bg-[#6B8E6F] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-[#6B8E6F]"
              }`}
            >
              👨‍👩‍👧‍👦 Rodiny
            </button>
            <button
              onClick={() => setVariant("seniors")}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                variant === "seniors"
                  ? "bg-[#6B8E6F] text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-[#6B8E6F]"
              }`}
            >
              👴 Seniory
            </button>
          </div>

          <div className="flex gap-2 items-center">
            <Globe className="w-4 h-4 text-gray-600" />
            {(["cs", "de", "en"] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  language === lang
                    ? "bg-[#6B8E6F] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-[#6B8E6F]"
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-[#6B8E6F]">
            {t.title}
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#o-projektu" className="text-gray-700 hover:text-[#6B8E6F] transition-colors">
              {t.about}
            </a>
            <a href="#nabidka" className="text-gray-700 hover:text-[#6B8E6F] transition-colors">
              {t.offer}
            </a>
            <a href="/gallery" className="text-gray-700 hover:text-[#6B8E6F] transition-colors">
              {t.gallery_button}
            </a>
            <a href="/booking" className="text-gray-700 hover:text-[#6B8E6F] transition-colors">
              {t.booking_button}
            </a>
            <a href="/faq" className="text-gray-700 hover:text-[#6B8E6F] transition-colors">
              {language === "cs" ? "FAQ" : language === "de" ? "FAQ" : "FAQ"}
            </a>
            <a href="#proc-priroda" className="text-gray-700 hover:text-[#6B8E6F] transition-colors">
              {t.why_nature_title}
            </a>
            <a href="#kontakt" className="text-gray-700 hover:text-[#6B8E6F] transition-colors">
              {t.contact}
            </a>
          </div>
        </div>
      </nav>

      {/* Intro Video Section */}
      <section className="relative w-full h-screen overflow-hidden bg-black">
        <video
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/video-uvod.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Hero Section - Asymmetric Layout */}
      <section className="relative overflow-hidden bg-[#F5F1E8]">
        <div className="container mx-auto px-4 py-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 items-center min-h-[600px]">
            {/* Text Content - Left Side */}
            <div className="py-16 md:py-0 md:pr-8 flex flex-col justify-center order-2 md:order-1">
              <div className="space-y-6">
                <div className="inline-block bg-[#E8956E]/10 text-[#E8956E] px-4 py-2 rounded-full text-sm font-semibold">
                  ✨ {variant === "families" ? "Nový koncept bydlení" : "Nový způsob života"}
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-[#2C3E3F] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {t.title}
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  {t.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    size="lg"
                    className="bg-[#6B8E6F] hover:bg-[#5a7a5f] text-white rounded-lg"
                    onClick={() => window.location.href = '/booking'}
                  >
                    {t.reserve_button} <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#6B8E6F] text-[#6B8E6F] hover:bg-[#6B8E6F]/5 rounded-lg"
                    onClick={() => window.location.href = '/gallery'}
                  >
                    {t.view_gallery}
                  </Button>
                </div>
              </div>
            </div>

            {/* Hero Image - Right Side */}
            <div className="order-1 md:order-2 -mx-4 md:mx-0">
              <img
                src="/images/hero-bungalow-exterior.jpg"
                alt={t.title}
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* Diagonal Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{
          clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)"
        } as React.CSSProperties}></div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#2C3E3F] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {variant === "families" ? "Poznáte náš projekt" : "Objevte náš projekt"}
          </h2>
          <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <video
              width="100%"
              height="auto"
              controls
              className="w-full h-auto"
              poster="/images/hero-family-nature.jpg"
            >
              <source src="/videos/complete-video-final.mp4" type="video/mp4" />
              Váš prohlížeč nepodporuje video element.
            </video>
          </div>
          <p className="text-center text-gray-600 mt-6 max-w-2xl mx-auto">
            {variant === "families"
              ? "Podívejte se na video a poznáte, jak vypadá náš bungalov a co vám nabízíme."
              : "Podívejte se na video a zjistěte, jak by mohl vypadat váš nový domov v přírodě."}
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="o-projektu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-[#2C3E3F] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.about_title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {t.about_text}
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              {t.hero_description}
            </p>
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section id="nabidka" className="py-20 bg-[#F5F1E8]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#2C3E3F] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {t.offer_title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#6B8E6F]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Leaf className="w-8 h-8 text-[#6B8E6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E3F] mb-4">
                {variant === "families" ? "Bezpečné prostředí" : "Klid a harmonie"}
              </h3>
              <p className="text-gray-600">
                {variant === "families"
                  ? "Přírodní prostředí s moderním komfortem pro bezpečný a zdravý vývoj dětí."
                  : "Klidné a harmonické prostředí ideální pro relaxaci a zdravý životní styl."}
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#E8956E]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-[#E8956E]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E3F] mb-4">
                {variant === "families" ? "Rodinné hodnoty" : "Wellness a péče"}
              </h3>
              <p className="text-gray-600">
                {variant === "families"
                  ? "Prostor pro kvalitní čas strávený spolu v přírodě a vytváření trvalých vzpomínek."
                  : "Kompletní vybavení a péče pro aktivní a zdravý životní styl v důchodu."}
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-[#6B8E6F]/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-[#6B8E6F]" />
              </div>
              <h3 className="text-xl font-bold text-[#2C3E3F] mb-4">
                {variant === "families" ? "Moderní vybavení" : "Ekologické řešení"}
              </h3>
              <p className="text-gray-600">
                {variant === "families"
                  ? "Plně vybavený bungalov s veškerým komfortem pro pohodlný pobyt v přírodě."
                  : "Ekologicky šetrné řešení s moderním komfortem a přírodními materiály."}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 mb-6">
              {t.offer_text}
            </p>
            <Button
              size="lg"
              className="bg-[#6B8E6F] hover:bg-[#5a7a5f] text-white rounded-lg"
              onClick={() => window.location.href = '/gallery'}
            >
              {t.view_gallery} <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Nature Section */}
      <section id="proc-priroda" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-[#2C3E3F] mb-6 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
              {t.why_nature_title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed text-center">
              {t.why_nature_text}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Preview Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#2C3E3F] mb-12 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>
            {language === "cs" ? "Máte otázky?" : language === "de" ? "Haben Sie Fragen?" : "Have Questions?"}
          </h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              {language === "cs"
                ? "Přečtěte si odpovědi na nejčastěji kladené otázky."
                : language === "de"
                ? "Lesen Sie die Antworten auf häufig gestellte Fragen."
                : "Read answers to frequently asked questions."}
            </p>
            <Button
              size="lg"
              className="bg-[#6B8E6F] hover:bg-[#5a7a5f] text-white rounded-lg"
              onClick={() => window.location.href = '/faq'}
            >
              {language === "cs" ? "Přejít na FAQ" : language === "de" ? "Zu FAQ" : "Go to FAQ"} <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Recenze */}
      <Reviews />

      {/* Zajímavosti a atrakce */}
      <Attractions />

      {/* CTA Section */}
      <section className="py-20 bg-[#6B8E6F] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {variant === "families"
              ? "Připraveni na nový začátek?"
              : "Připraveni na nový kapitolu?"}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            {variant === "families"
              ? "Kontaktujte nás a zjistěte více o dlouhodobém pronájmu našeho bungalovu."
              : "Kontaktujte nás a zjistěte více o pronájmu pro seniory."}
          </p>
          <Button
            size="lg"
            className="bg-white text-[#6B8E6F] hover:bg-gray-100 rounded-lg"
            onClick={() => window.location.href = '/booking'}
          >
            {t.booking_button} <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C3E3F] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-300">
            &copy; 2025 {t.title}. Všechna práva vyhrazena.
          </p>
          <p className="text-gray-400 text-sm mt-4">
            {variant === "families"
              ? "Koncept Tomáše Černického"
              : "Koncept pro aktivní stáří"}
          </p>
        </div>
      </footer>

      {/* AI Reservation Widget */}
      <AIReservationWidget />
    </div>
  );
}
