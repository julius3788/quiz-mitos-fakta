import React, { useEffect, useState } from "react";
import QuizCard from "./components/QuizCard";
import StartScreen from "./components/StartScreen";
import Result from "./components/Result";

export default function App() {
  const [quizData, setQuizData] = useState({ id: [], en: [] }); // Simpan kedua bahasa
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("start");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [language, setLanguage] = useState("id");
  const [dataLoaded, setDataLoaded] = useState({ id: false, en: false });

  // Konten multilingual
  const content = {
    id: {
      loading: "⏳ Memuat pertanyaan...",
      failedToLoad: "Gagal Memuat Quiz",
      tryAgain: "Coba Lagi",
      noQuestions: "Tidak ada pertanyaan tersedia.",
      errorPrefix: "Terjadi kesalahan: ",
      usingIndonesianData: "Menggunakan data Bahasa Indonesia",
      usingEnglishData: "Menggunakan data Bahasa Inggris",
      switchToEnglish: "Ganti ke English",
      switchToIndonesian: "Ganti ke Indonesia"
    },
    en: {
      loading: "⏳ Loading questions...",
      failedToLoad: "Failed to Load Quiz",
      tryAgain: "Try Again",
      noQuestions: "No questions available.",
      errorPrefix: "Error: ",
      usingIndonesianData: "Using Indonesian data",
      usingEnglishData: "Using English data",
      switchToEnglish: "Switch to English",
      switchToIndonesian: "Switch to Indonesian"
    }
  };

  const currentContent = content[language];

  // Load kedua data quiz saat pertama kali
  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        await Promise.all([
          loadQuizData("id"),
          loadQuizData("en")
        ]);
      } catch (err) {
        console.error("Error loading quiz data:", err);
      } finally {
        setLoading(false);
      }
    };
    
    loadAllData();
  }, []);

  // Fungsi untuk memuat data quiz
  const loadQuizData = async (lang) => {
    try {
      const quizFileName = lang === "id" ? "quizDataId.json" : "quizDataEn.json";
      console.log(`📥 Loading quiz data from: ${quizFileName} for ${lang}`);

      const response = await fetch(`${import.meta.env.BASE_URL}${quizFileName}`);
      if (!response.ok) throw new Error(`Failed to load quiz data: ${response.status}`);

      const data = await response.json();
      const questions = Array.isArray(data) ? data : data.questions || [];

      if (questions.length === 0) throw new Error(`No questions found in ${quizFileName}`);

      // Update state dengan data baru
      setQuizData(prev => ({
        ...prev,
        [lang]: questions
      }));
      
      setDataLoaded(prev => ({
        ...prev,
        [lang]: true
      }));

      console.log(`✅ Loaded ${questions.length} questions for ${lang}`);
      
      // Debug: tampilkan contoh pertanyaan
      if (questions.length > 0) {
        console.log(`📝 Sample ${lang} question: "${questions[0].question.substring(0, 50)}..."`);
      }
      
      return questions;
    } catch (err) {
      console.error(`❌ Error loading ${lang} quiz data:`, err);
      setDataLoaded(prev => ({
        ...prev,
        [lang]: false
      }));
      throw err;
    }
  };

  // Ambil 10 pertanyaan acak dari bahasa yang dipilih
  const getRandomQuestions = (lang = language) => {
    const questions = quizData[lang] || [];
    
    if (questions.length === 0) {
      console.log(`❌ No ${lang} quiz data available for random questions`);
      return [];
    }
    
    const shuffled = [...questions].sort(() => Math.random() - 0.5).slice(0, 10);
    console.log(`🎲 Generated ${shuffled.length} random ${lang} questions`);
    
    // Debug: tampilkan bahasa pertanyaan pertama
    if (shuffled.length > 0) {
      console.log(`🔍 First ${lang} question: "${shuffled[0].question.substring(0, 30)}..."`);
    }
    
    return shuffled;
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    if (currentQuestion + 1 < randomQuestions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setGameState("finished");
    }
  };

  const handleStartQuiz = async (name, selectedLanguage = "id") => {
    setPlayerName(name);
    console.log(`🚀 Starting quiz for ${name} in ${selectedLanguage}`);

    // Set language dulu
    if (selectedLanguage !== language) {
      console.log(`🔄 Language changed from ${language} to ${selectedLanguage}`);
      setLanguage(selectedLanguage);
    }

    // Tunggu sebentar untuk memastikan state update
    await new Promise(resolve => setTimeout(resolve, 100));

    // Cek jika data untuk bahasa ini sudah diload
    if (!dataLoaded[selectedLanguage]) {
      console.log(`📥 ${selectedLanguage} data not loaded, loading now...`);
      setLoading(true);
      try {
        await loadQuizData(selectedLanguage);
      } catch (err) {
        console.error(`Failed to load ${selectedLanguage} data:`, err);
        setError(`Gagal memuat data untuk bahasa ${selectedLanguage}`);
        return;
      } finally {
        setLoading(false);
      }
    }

    // Generate random questions dengan data yang sudah dipastikan
    const randomQs = getRandomQuestions(selectedLanguage);
    
    if (randomQs.length === 0) {
      console.error(`⚠️ No ${selectedLanguage} questions available after loading`);
      setError(`Tidak ada pertanyaan yang tersedia untuk bahasa ${selectedLanguage}. Silakan coba lagi.`);
      return;
    }

    console.log(`🎯 Setting ${randomQs.length} ${selectedLanguage} questions for quiz`);
    setRandomQuestions(randomQs);
    setCurrentQuestion(0);
    setScore(0);
    setGameState("playing");
  };

  const handleRestartQuiz = () => {
    console.log("🔄 Restarting quiz");
    const randomQs = getRandomQuestions();
    setRandomQuestions(randomQs);
    setCurrentQuestion(0);
    setScore(0);
    setGameState("playing");
  };

  const handleBackToStart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setPlayerName("");
    setGameState("start");
  };

  const handleRetryLoad = () => {
    loadQuizData(language);
  };

  const handleLanguageChange = async (newLanguage) => {
    if (newLanguage !== language) {
      setLanguage(newLanguage);
      if (!dataLoaded[newLanguage]) {
        await loadQuizData(newLanguage);
      }
    }
  };

  // Fungsi render tampilan utama
  const renderContent = () => {
    switch (gameState) {
      case "start":
        return <StartScreen onStart={handleStartQuiz} />;

      case "finished":
        return (
          <Result
            score={score}
            total={randomQuestions.length}
            onRestart={handleRestartQuiz}
            onBackToStart={handleBackToStart}
            playerName={playerName}
            language={language}
          />
        );

      case "playing":
        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">{currentContent.loading}</p>
                <p className="text-gray-500 text-sm mt-2">
                  {language === "id"
                    ? currentContent.usingIndonesianData
                    : currentContent.usingEnglishData}
                </p>
              </div>
            </div>
          );
        }

        if (error) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center bg-white rounded-3xl p-8 shadow-lg max-w-md">
                <div className="text-6xl mb-4">😞</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {currentContent.failedToLoad}
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
                  {currentContent.errorPrefix}
                  {error}
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={handleRetryLoad}
                    className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/80 transition-colors"
                  >
                    {currentContent.tryAgain}
                  </button>
                  <button
                    onClick={() =>
                      handleLanguageChange(language === "id" ? "en" : "id")
                    }
                    className="bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-colors"
                  >
                    {language === "id"
                      ? currentContent.switchToEnglish
                      : currentContent.switchToIndonesian}
                  </button>
                </div>
              </div>
            </div>
          );
        }

        if (randomQuestions.length > 0 && randomQuestions[currentQuestion]) {
          console.log(`📊 Rendering ${language} question ${currentQuestion + 1} of ${randomQuestions.length}`);
          console.log(`🔍 Question text: "${randomQuestions[currentQuestion].question}"`);
          return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
              <QuizCard
                question={randomQuestions[currentQuestion]}
                total={randomQuestions.length}
                current={currentQuestion}
                onAnswer={handleAnswer}
                playerName={playerName}
                language={language}
              />
            </div>
          );
        }

        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-lg">{currentContent.noQuestions}</p>
              <button
                onClick={handleRetryLoad}
                className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/80 transition-colors mt-4"
              >
                {currentContent.tryAgain}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
      {renderContent()}
    </div>
  );
}