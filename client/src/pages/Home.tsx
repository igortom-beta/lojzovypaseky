import { FloatingChatWidget } from "@/components/FloatingChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        {/* Your existing website content goes here */}
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold mb-4">Lojzovy Paseky</h1>
          <p className="text-lg text-gray-600">Moderní bungalovy u Lipna</p>
        </div>
      </main>
      
      {/* Floating Chat Widget */}
      <FloatingChatWidget />
    </div>
  );
}
