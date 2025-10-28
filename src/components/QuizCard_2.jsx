import React, { useState, useEffect } from "react";

export default function QuizCard({ question, total, current, onAnswer, playerName }) {
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [criticalTime, setCriticalTime] = useState(false); // State untuk efek kritis

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

  // Sound effect untuk waktu kritis
  const playCriticalSound = () => {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 300;
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  };

  // Timer countdown effect dengan visual effects
  useEffect(() => {
    if (!isTimerActive) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        // Trigger efek visual saat 10 detik terakhir
        if (prevTime === 11) {
          setCriticalTime(true);
        }
        
        // Trigger efek visual saat 5 detik terakhir
        if (prevTime === 6) {
          playCriticalSound();
        }

        if (prevTime <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive]);

  // Reset semua effects ketika pindah pertanyaan
  useEffect(() => {
    setTimeLeft(30);
    setIsTimerActive(true);
    setSelected(null);
    setShowExplanation(false);
    setCriticalTime(false);
  }, [current]);

  const handleTimeUp = () => {
    setIsTimerActive(false);
    setCriticalTime(false);
    const correct = false;
    setSelected("TIME_UP");
    setIsCorrect(correct);
    setShowExplanation(true);
    playSound(correct);

    setTimeout(() => {
      setShowExplanation(false);
      setSelected(null);
      onAnswer(correct);
    }, 2500);
  };

  const handleAnswer = (ans) => {
    if (!isTimerActive || selected) return;
    
    setIsTimerActive(false);
    setCriticalTime(false);
    const correct = ans === question.correct;
    
    setSelected(ans);
    setIsCorrect(correct);
    setShowExplanation(true);
    playSound(correct);

    setTimeout(() => {
      setShowExplanation(false);
      setSelected(null);
      onAnswer(correct);
    }, 2500);
  };

  const progress = ((current + 1) / total) * 100;

  // Warna dan efek berdasarkan sisa waktu
  const getTimerColor = () => {
    if (timeLeft > 15) return "text-green-500";
    if (timeLeft > 7) return "text-yellow-500";
    return "text-red-500";
  };

  const getTimerContainerClass = () => {
    if (timeLeft > 15) return "bg-green-50 border-green-200";
    if (timeLeft > 7) return "bg-yellow-50 border-yellow-200";
    
    // Efek khusus untuk waktu kritis
    if (criticalTime) {
      return "bg-red-50 border-red-300 animate-pulse";
    }
    return "bg-red-50 border-red-200";
  };

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
    
    if (!isTimerActive) {
      return "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed";
    }
    
    return opt === "Fakta" 
      ? "bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600"
      : "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600";
  };

  return (
    <div className={`bg-white rounded-3xl p-6 sm:p-8 shadow-lg w-full max-w-lg text-center transition-all animate-fadeIn ${
      criticalTime ? 'ring-2 ring-red-400 ring-opacity-50' : ''
    }`}>
      
      {/* Header dengan nama & timer yang enhanced */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-left">
          <p className="text-sm text-gray-600">Halo,</p>
          <p className="font-semibold text-primary">{playerName}</p>
        </div>
        
        {/* Enhanced Timer Display dengan effects */}
        <div className={`text-right px-4 py-2 rounded-2xl border-2 transition-all duration-300 ${getTimerContainerClass()}`}>
          <div className={`text-2xl font-bold ${getTimerColor()} ${
            criticalTime ? 'animate-bounce' : ''
          }`}>
            {timeLeft}s
          </div>
          <p className="text-xs text-gray-500 mt-1">Sisa Waktu</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-2 bg-blue-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
        <p className="text-xs text-gray-500 mt-1">
          {current + 1} / {total}
        </p>
      </div>

      {/* Pertanyaan dengan efek shake saat waktu kritis */}
      <h2 className={`text-lg font-semibold text-gray-800 mb-8 leading-relaxed transition-all ${
        criticalTime ? 'animate-pulse text-red-600' : ''
      }`}>
        {question.question}
      </h2>

      {/* Tombol Fakta/Mitos dengan efek glow */}
      <div className="flex justify-center gap-4 sm:gap-6">
        {["Fakta", "Mitos"].map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            disabled={!!selected || !isTimerActive}
            className={`px-6 py-3 rounded-full font-medium border-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-w-[100px] ${
              criticalTime ? 'animate-pulse shadow-lg' : ''
            } ${getButtonColor(opt)}`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Warning message saat waktu kritis */}
      {criticalTime && timeLeft <= 10 && (
        <div className="mt-4 p-3 bg-red-100 border border-red-300 rounded-xl animate-pulse">
          <p className="text-red-700 text-sm font-medium flex items-center justify-center">
            ⚡️ Cepat! Waktu hampir habis!
          </p>
        </div>
      )}

      {/* Visual timer bar dengan efek */}
      <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft > 15 ? 'bg-green-500' : 
            timeLeft > 7 ? 'bg-yellow-500' : 
            'bg-red-500 animate-pulse'
          }`}
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        />
      </div>

      {/* Countdown dots visual */}
      <div className="flex justify-center mt-3 space-x-1">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              timeLeft > (25 - index * 5) ? 'bg-green-400' : 
              timeLeft > (20 - index * 5) ? 'bg-yellow-400' : 
              'bg-red-400'
            } ${
              criticalTime && timeLeft <= (10 - index * 2) ? 'animate-ping' : ''
            }`}
          />
        ))}
      </div>

      {/* Penjelasan */}
      {showExplanation && (
        <div
          className={`mt-6 text-sm p-4 rounded-2xl ${
            isCorrect 
              ? "bg-green-100 text-green-700" 
              : selected === "TIME_UP"
              ? "bg-orange-100 text-orange-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <p>
            <strong>
              {selected === "TIME_UP" 
                ? "⏰ Waktu Habis!" 
                : isCorrect ? "✅ Benar!" : "❌ Salah!"
              }
            </strong>{" "}
            {question.explanation}
          </p>
          {selected === "TIME_UP" && (
            <p className="text-xs mt-1">
              Jawaban benar: <strong>{question.correct}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
}