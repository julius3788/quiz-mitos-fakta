import React, { useEffect, useState } from "react";
import QuizCard from "./components/QuizCard";
import StartScreen from "./components/StartScreen";
import Result from "./components/Result";

export default function App() {
  const [quizData, setQuizData] = useState([]);
  const [randomQuestions, setRandomQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState("start"); // "start", "playing", "finished"
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${import.meta.env.BASE_URL}quizData.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load quiz data: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Handle both array format and {questions: []} format
      const questions = Array.isArray(data) ? data : data.questions || [];
      
      if (questions.length === 0) {
        throw new Error("No questions found in quiz data");
      }
      
      setQuizData(questions);
    } catch (err) {
      console.error("Error loading quiz data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get random questions
  const getRandomQuestions = () => {
    if (quizData.length === 0) return [];
    
    // Shuffle array and take first 10 questions
    const shuffled = [...quizData]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10);
    
    return shuffled;
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    // Move to next question or finish quiz
    if (currentQuestion + 1 < randomQuestions.length) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setGameState("finished");
    }
  };

  const handleStartQuiz = (name) => {
    setPlayerName(name);
    const randomQs = getRandomQuestions();
    setRandomQuestions(randomQs);
    setCurrentQuestion(0);
    setScore(0);
    setGameState("playing");
  };

  const handleRestartQuiz = () => {
    const randomQs = getRandomQuestions();
    setRandomQuestions(randomQs);
    setCurrentQuestion(0);
    setScore(0);
    setGameState("playing");
  };

  const handleBackToStart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setPlayerName(""); // Reset nama juga jika kembali ke start
    setGameState("start");
  };

  const handleRetryLoad = () => {
    loadQuizData();
  };

  // Render different states
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
            playerName={playerName}  // ← INI YANG DITAMBAHKAN
          />
        );

      case "playing":
        if (loading) {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-gray-600 text-lg">⏳ Memuat pertanyaan...</p>
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
                  Gagal Memuat Quiz
                </h2>
                <p className="text-gray-600 mb-4 text-sm">
                  {error}
                </p>
                <button
                  onClick={handleRetryLoad}
                  className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/80 transition-colors"
                >
                  Coba Lagi
                </button>
              </div>
            </div>
          );
        }

        if (randomQuestions.length > 0 && randomQuestions[currentQuestion]) {
          return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 p-4">
              <QuizCard
                question={randomQuestions[currentQuestion]}
                total={randomQuestions.length}
                current={currentQuestion}
                onAnswer={handleAnswer}
              />
            </div>
          );
        }

        return (
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-600 text-lg">Tidak ada pertanyaan tersedia.</p>
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