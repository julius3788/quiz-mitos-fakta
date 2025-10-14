import React, { useState, useEffect } from "react";
import QuizCard from "./components/QuizCard";
import Result from "./components/Result";
import StartScreen from "./components/StartScreen";

function App() {
  const [name, setName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Ambil & acak data quiz dari public/quizData.json
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}quizData.json`)
      .then((res) => res.json())
      .then((data) => {
        // Acak urutan dan ambil 10 pertanyaan pertama
        const shuffled = data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setQuestions(shuffled);
        setLoading(false);
      })
      .catch((err) => console.error("Gagal memuat data quiz:", err));
  }, []);

  // ✅ Simpan nama pemain dari StartScreen
  const handleStart = (playerName) => {
    setName(playerName);
  };

  // ✅ Logika jawaban benar/salah
  const handleAnswer = (selected) => {
    const currentQuestion = questions[currentIndex];
    if (selected === currentQuestion.correct) {
      setScore(score + 1);
      setFeedback(`✅ Benar! ${currentQuestion.explanation}`);
    } else {
      setFeedback(`❌ Salah! ${currentQuestion.explanation}`);
    }

    // Lanjut ke soal berikut setelah 1.5 detik
    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setFeedback("");
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  // ✅ Ulangi permainan dari awal
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setFeedback("");
    setName("");
  };

  // ✅ Tampilkan loading
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl">
        Memuat soal...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-100 to-teal-200 p-6">
      {!name ? (
        <StartScreen onStart={handleStart} />
      ) : !showResult ? (
        <>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Halo, {name} 👋
          </h2>
          <QuizCard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
          />
          {feedback && (
            <p className="mt-6 text-2xl font-medium text-gray-700">{feedback}</p>
          )}
          <p className="mt-4 text-lg text-gray-600">
            Soal {currentIndex + 1} dari {questions.length}
          </p>
        </>
      ) : (
        <Result
          score={score}
          total={questions.length}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
