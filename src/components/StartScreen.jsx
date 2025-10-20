import React, { useState } from "react";

export default function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(true);

  const handleStartQuiz = () => {
    if (playerName.trim() === "") {
      alert("Silakan masukkan nama kamu terlebih dahulu!");
      return;
    }
    onStart(playerName.trim());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleStartQuiz();
    }
  };

  if (!showNameInput) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-primary/20 to-secondary/30 text-gray-800 p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg max-w-md w-full">
          <h1 className="text-4xl font-bold mb-3">🎓 Quiz Bisnis Digital</h1>
          <p className="mb-6 text-lg opacity-80">
            Halo, <span className="font-semibold text-primary">{playerName}</span>! Siap menguji pengetahuanmu?
          </p>
          
          <div className="mb-6 p-3 bg-amber-100 rounded-2xl">
            <p className="text-sm font-medium text-amber-800">
              🎲 10 pertanyaan acak menantimu!
            </p>
            <p className="text-xs text-amber-600 mt-1">
              Setiap memulai quiz, pertanyaan akan diacak ulang
            </p>
          </div>
          
          <div className="flex gap-3 mb-4">
            <button
              onClick={() => setShowNameInput(true)}
              className="flex-1 bg-gray-500 text-white px-4 py-3 rounded-full font-medium hover:bg-gray-600 transition-all duration-300"
            >
              Ganti Nama
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 bg-amber-400 text-gray-900 px-4 py-3 rounded-full font-semibold shadow-md hover:bg-amber-500 hover:scale-105 transition-all duration-300"
            >
              Mulai Quiz 🚀
            </button>
          </div>
          
          <div className="text-xs text-gray-600">
            <p>💡 Pilih <span className="text-green-600 font-semibold">Fakta</span> jika pernyataan BENAR</p>
            <p>💡 Pilih <span className="text-red-600 font-semibold">Mitos</span> jika pernyataan SALAH</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-primary/20 to-secondary/30 text-gray-800 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-3">🎓 Quiz Bisnis Digital</h1>
        <p className="mb-6 text-lg opacity-80">
          Masukkan nama kamu untuk mulai
        </p>
        
        {/* Input Nama */}
        <div className="mb-6">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ketik nama kamu di sini..."
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-center text-lg"
            autoFocus
          />
          {playerName.trim() === "" && (
            <p className="text-red-500 text-sm mt-2">Nama harus diisi!</p>
          )}
        </div>

        <div className="mb-6 p-3 bg-amber-100 rounded-2xl">
          <p className="text-sm font-medium text-amber-800">
            🎲 10 pertanyaan acak menantimu!
          </p>
          <p className="text-xs text-amber-600 mt-1">
            Uji pengetahuanmu tentang mitos & fakta bisnis digital
          </p>
        </div>
        
        <button
          onClick={handleStartQuiz}
          disabled={playerName.trim() === ""}
          className={`w-full py-4 rounded-full font-semibold text-lg shadow-md transition-all duration-300 ${
            playerName.trim() === "" 
              ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
              : "bg-amber-400 text-gray-900 hover:bg-amber-500 hover:scale-105"
          }`}
        >
          {playerName.trim() === "" ? "Masukkan Nama" : "Lanjutkan →"}
        </button>
        
        <div className="mt-6 text-xs text-gray-600">
          <p>Nama akan ditampilkan di hasil akhir quiz</p>
        </div>
      </div>
    </div>
  );
}