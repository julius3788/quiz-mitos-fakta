import React from "react";

function Result({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  let message = "Keren! 🚀";
  if (percentage < 50) message = "Jangan menyerah, coba lagi 💪";
  else if (percentage < 80) message = "Bagus! Kamu paham dasarnya 😎";

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 text-center w-full max-w-2xl">
      <h2 className="text-4xl font-bold text-blue-600 mb-6">Hasil Quiz</h2>
      <p className="text-2xl mb-2">
        Skor kamu: <b>{score}</b> dari <b>{total}</b> pertanyaan
      </p>
      <p className="text-xl text-gray-600 mb-8">{message}</p>
      <button
        onClick={onRestart}
        className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-4 rounded-2xl font-semibold text-xl transition-all"
      >
        Main Lagi 🔁
      </button>
    </div>
  );
}

export default Result;
