import React from "react";

export default function Result({ score, total, onRestart, playerName }) {
  const pct = (score / total) * 100;
  const msg =
    pct >= 80
      ? "🔥 Hebat! Kamu paham banget dunia digital!"
      : pct >= 50
      ? "⚡ Lumayan! Masih bisa ditingkatkan."
      : "💡 Yuk belajar lagi! Dunia digital seru kok.";

  // Emoji berdasarkan skor
  const getEmoji = () => {
    if (pct >= 80) return "🎉";
    if (pct >= 60) return "👍";
    if (pct >= 40) return "😊";
    return "📚";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-primary/20 text-gray-800 text-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-lg max-w-md w-full">
        {/* Header dengan nama */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Hasil Quiz</h2>
          <p className="text-lg text-gray-600">
            Selamat, <span className="font-semibold text-primary">{playerName}</span>!
          </p>
        </div>

        {/* Emoji besar */}
        <div className="text-6xl mb-4">{getEmoji()}</div>

        {/* Skor */}
        <div className="mb-6">
          <p className="text-2xl mb-2">
            <span className="text-primary font-bold">{score}</span> / {total}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">{Math.round(pct)}% benar</p>
        </div>

        {/* Pesan */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg font-medium">{msg}</p>
        </div>

        {/* Tombol */}
        <button
          onClick={onRestart}
          className="bg-blue-900 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-blue-800 hover:scale-105 focus:ring-2 focus:ring-blue-300 transition-all duration-300 w-full text-lg"
        >
          🔁 Main Lagi
        </button>

        {/* Info kecil */}
        <p className="text-xs text-gray-500 mt-4">
          * Pertanyaan akan diacak ulang setiap memulai quiz baru
        </p>
      </div>
    </div>
  );
}