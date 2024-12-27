import HistoryButton from "@/components/HistoryButton";
import LinkForm from "@/components/LinkForm ";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">URL Shortener & QR Code Generator</h1>
    <LinkForm />
    <div className="mt-4">
      <HistoryButton />
    </div>
  </main>

  );
}
