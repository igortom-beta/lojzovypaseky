import { useState } from "react";

interface PasswordProtectionProps {
  children: React.ReactNode;
}

export function PasswordProtection({ children }: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if already authenticated in this session
    return sessionStorage.getItem("authenticated") === "true";
  });
  const [error, setError] = useState("");

  const correctPassword = "Sekaneseka3";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem("authenticated", "true");
      setError("");
    } else {
      setError("Nesprávné heslo");
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#6B8E6F] to-[#2C3E3F]">
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-12 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2C3E3F] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
            Lojzovy Paseky
          </h1>
          <p className="text-gray-600">Zadejte heslo pro přístup</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Heslo
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6B8E6F] focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              autoFocus
            />
            {error && (
              <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#6B8E6F] hover:bg-[#5A7A5E] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Přístup
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Testovací verze pro pana doktora</p>
        </div>
      </div>
    </div>
  );
}
