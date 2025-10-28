import React, { useState } from "react";

export default function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState("");
  const [language, setLanguage] = useState("en"); // 'id' untuk Indonesia, 'en' untuk English

  // Konten berdasarkan bahasa
  const content = {
    id: {
      title: "🎓 Quiz Bisnis Digital",
      inputLabel: "Masukkan nama kamu untuk mulai",
      inputPlaceholder: "Ketik nama kamu di sini...",
      nameRequired: "Nama harus diisi!",
      pleaseEnterName: "Silakan masukkan nama kamu terlebih dahulu!",
      startQuiz: "Mulai Quiz 🚀",
      enterName: "Masukkan Nama",
      quizInfo: "🎲 10 pertanyaan acak menantimu!",
      quizDescription: "Uji pengetahuanmu tentang mitos & fakta bisnis digital",
      tips: [
        "💡 Pilih <span class='text-green-600 font-semibold'>Fakta</span> jika pernyataan BENAR",
        "💡 Pilih <span class='text-red-600 font-semibold'>Mitos</span> jika pernyataan SALAH"
      ],
      nameDisplay: "Nama akan ditampilkan di hasil akhir quiz",
      selectLanguage: "Pilih Bahasa:",
      languageId: "🇮🇩 Indonesia",
      languageEn: "🇺🇸 English"
    },
    en: {
      title: "🎓 Digital Business Quiz",
      inputLabel: "Enter your name to start",
      inputPlaceholder: "Type your name here...",
      nameRequired: "Name is required!",
      pleaseEnterName: "Please enter your name first!",
      startQuiz: "Start Quiz 🚀",
      enterName: "Enter Name",
      quizInfo: "🎲 10 random questions await you!",
      quizDescription: "Test your knowledge about digital business myths & facts",
      tips: [
        "💡 Select <span class='text-green-600 font-semibold'>Fact</span> if the statement is TRUE",
        "💡 Select <span class='text-red-600 font-semibold'>Myth</span> if the statement is FALSE"
      ],
      nameDisplay: "Name will be displayed in the final quiz results",
      selectLanguage: "Select Language:",
      languageId: "🇮🇩 Indonesia",
      languageEn: "🇺🇸 English"
    }
  };

  const currentContent = content[language];

  const handleStartQuiz = () => {
    if (playerName.trim() === "") {
      alert(currentContent.pleaseEnterName);
      return;
    }
    onStart(playerName.trim(), language);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleStartQuiz();
    }
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-primary/20 to-secondary/30 text-gray-800 p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold mb-3">{currentContent.title}</h1>
        <p className="mb-6 text-lg opacity-80">
          {currentContent.inputLabel}
        </p>
        
        {/* Language Selector */}
        <div className="mb-4 p-3 bg-blue-50 rounded-2xl">
          <p className="text-sm font-medium text-blue-800 mb-2">
            {currentContent.selectLanguage}
          </p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => handleLanguageChange("id")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                language === "id" 
                  ? "bg-blue-500 text-white shadow-md" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {currentContent.languageId}
            </button>
            <button
              onClick={() => handleLanguageChange("en")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                language === "en" 
                  ? "bg-blue-500 text-white shadow-md" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {currentContent.languageEn}
            </button>
          </div>
        </div>
        
        {/* Input Nama */}
        <div className="mb-6">
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={currentContent.inputPlaceholder}
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-300 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 transition-all duration-300 text-center text-lg"
            autoFocus
          />
          {playerName.trim() === "" && (
            <p className="text-red-500 text-sm mt-2">{currentContent.nameRequired}</p>
          )}
        </div>

        <div className="mb-6 p-3 bg-amber-100 rounded-2xl">
          <p className="text-sm font-medium text-amber-800">
            {currentContent.quizInfo}
          </p>
          <p className="text-xs text-amber-600 mt-1">
            {currentContent.quizDescription}
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
          {playerName.trim() === "" ? currentContent.enterName : currentContent.startQuiz}
        </button>
        
        <div className="mt-6 text-xs text-gray-600">
          {currentContent.tips.map((tip, index) => (
            <p 
              key={index} 
              dangerouslySetInnerHTML={{ __html: tip }}
            />
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          <p>{currentContent.nameDisplay}</p>
        </div>
      </div>
    </div>
  );
}