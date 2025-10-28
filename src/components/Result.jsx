import React from "react";

export default function Result({ score, total, onRestart, onBackToStart, playerName, language }) {
  const pct = (score / total) * 100;
  
  // Konten multilingual untuk Result
  const content = {
    id: {
      title: "Hasil Quiz",
      congratulations: "Selamat,",
      score: "Skor",
      correct: "benar",
      playAgain: "🔁 Main Lagi",
      backToStart: "🏠 Kembali ke Awal",
      quizInfo: "* Pertanyaan akan diacak ulang setiap memulai quiz baru",
      messages: {
        excellent: "🔥 Hebat! Kamu paham banget dunia digital!",
        good: "⚡ Lumayan! Masih bisa ditingkatkan.",
        needImprovement: "💡 Yuk belajar lagi! Dunia digital seru kok."
      }
    },
    en: {
      title: "Quiz Result",
      congratulations: "Congratulations,",
      score: "Score",
      correct: "correct",
      playAgain: "🔁 Play Again",
      backToStart: "🏠 Back to Start",
      quizInfo: "* Questions will be shuffled every time you start a new quiz",
      messages: {
        excellent: "🔥 Excellent! You really understand the digital world!",
        good: "⚡ Good! There's still room for improvement.",
        needImprovement: "💡 Let's learn more! The digital world is exciting."
      }
    }
  };

  const currentContent = content[language];

  // Pesan berdasarkan skor
  const getMessage = () => {
    if (pct >= 80) return currentContent.messages.excellent;
    if (pct >= 50) return currentContent.messages.good;
    return currentContent.messages.needImprovement;
  };

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
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{currentContent.title}</h2>
          <p className="text-lg text-gray-600">
            {currentContent.congratulations}{" "}
            <span className="font-semibold text-primary">{playerName}</span>!
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
          <p className="text-sm text-gray-600">
            {Math.round(pct)}% {currentContent.correct}
          </p>
        </div>

        {/* Pesan */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg font-medium">{getMessage()}</p>
        </div>

        {/* Tombol Aksi */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onRestart}
            className="bg-blue-900 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-blue-800 hover:scale-105 focus:ring-2 focus:ring-blue-300 transition-all duration-300 w-full text-lg"
          >
            {currentContent.playAgain}
          </button>
          
          <button
            onClick={onBackToStart}
            className="bg-gray-500 text-white font-semibold px-8 py-4 rounded-full shadow-md hover:bg-gray-600 hover:scale-105 focus:ring-2 focus:ring-gray-300 transition-all duration-300 w-full text-lg"
          >
            {currentContent.backToStart}
          </button>
        </div>

        {/* Info kecil */}
        <p className="text-xs text-gray-500 mt-4">
          {currentContent.quizInfo}
        </p>
      </div>
    </div>
  );
}