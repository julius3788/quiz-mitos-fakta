import React from "react";

export default function Result({ score, total, onRestart, playerName }) {
  const pct = (score / total) * 100;
  
  // Link Google Form kamu
  const googleFormLink = "https://forms.gle/ZYnwsFtrufe42tDUA";

  const getEmoji = () => {
    if (pct >= 80) return "🎉";
    if (pct >= 60) return "👍";
    if (pct >= 40) return "😊";
    return "📚";
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-primary/20 text-gray-800 text-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-lg max-w-md w-full">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2 text-gray-800">Hasil Quiz</h2>
          <p className="text-lg text-gray-600">
            Selamat, <span className="font-semibold text-primary">{playerName}</span>!
          </p>
        </div>

        {/* Emoji & Score */}
        <div className="text-6xl mb-4">{getEmoji()}</div>
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

        {/* BAGIAN BARU: LINK KUESIONER */}
        <div className="mb-6 p-4 bg-blue-50 rounded-2xl border-2 border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">🎯 Bantu Penelitian Kami!</h3>
          <p className="text-sm text-blue-700 mb-3">
            Butuh waktu 5 menit untuk isi kuesioner. Kontribusi Anda sangat berharga untuk pengembangan pendidikan bisnis digital!
          </p>
          <a 
            href={googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors text-sm"
          >
            📝 Isi Kuesioner Sekarang
          </a>
        </div>

        {/* Tombol Main Lagi */}
        <button
          onClick={onRestart}
          className="bg-blue-900 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-blue-800 hover:scale-105 focus:ring-2 focus:ring-blue-300 transition-all duration-300 w-full text-lg mb-3"
        >
          🔁 Main Lagi
        </button>

        <p className="text-xs text-gray-500">
          * Pertanyaan akan diacak ulang setiap memulai quiz baru
        </p>
      </div>
    </div>
  );
}