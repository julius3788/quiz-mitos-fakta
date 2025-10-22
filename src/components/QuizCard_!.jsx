import React, { useState } from "react";

export default function QuizCard({ question, total, current, onAnswer, playerName }) { // ← TAMBAH playerName di props
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const playSound = (correct) => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = correct ? 600 : 200;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  };

  const handleAnswer = (ans) => {
    const correct = ans === question.correct;
    
    setSelected(ans);
    setIsCorrect(correct);
    setShowExplanation(true);
    playSound(correct);

    setTimeout(() => {
      setShowExplanation(false);
      setSelected(null);
      onAnswer(correct);
    }, 1500); // Waktu yang sudah dipendekkan
  };

  const progress = ((current + 1) / total) * 100;

  const getButtonColor = (opt) => {
    if (selected) {
      if (selected === opt) {
        const isThisCorrect = opt === question.correct;
        return isThisCorrect
          ? "bg-green-500 border-green-500 text-white scale-105"
          : "bg-red-500 border-red-500 text-white scale-105";
      }
      return "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed";
    }
    
    return opt === "Fakta" 
      ? "bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600"
      : "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600";
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg w-full max-w-lg text-center transition-all animate-fadeIn">
      {/* Header dengan nama player dan progress */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-left">
          <p className="text-sm text-gray-600">Halo,</p>
          <p className="font-semibold text-primary">{playerName}</p>
        </div>
        
        {/* Progress bar */}
        <div className="flex-1 mx-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-blue-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {current + 1} / {total}
          </p>
        </div>
      </div>

      {/* Pertanyaan */}
      <h2 className="text-lg font-semibold text-gray-800 mb-8 leading-relaxed">
        {question.question}
      </h2>

      {/* Tombol Fakta/Mitos */}
      <div className="flex justify-center gap-4 sm:gap-6">
        {["Fakta", "Mitos"].map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={!!selected}
            className={`px-6 py-3 rounded-full font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-[100px] ${getButtonColor(opt)}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Penjelasan */}
      {showExplanation && (
        <div
          className={`mt-6 text-sm p-4 rounded-2xl ${
            isCorrect ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          <p>
            <strong>{isCorrect ? "✅ Benar!" : "❌ Salah!"}</strong>{" "}
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}