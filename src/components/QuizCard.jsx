import React from "react";

function QuizCard({ question, onAnswer }) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-3xl text-center transform transition-all hover:scale-[1.02]">
      <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-gray-800 leading-snug">
        {question.question}
      </h2>
      <div className="flex justify-center gap-10">
        <button
          onClick={() => onAnswer("Mitos")}
          className="bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all"
        >
          Mitos
        </button>
        <button
          onClick={() => onAnswer("Fakta")}
          className="bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all"
        >
          Fakta
        </button>
      </div>
    </div>
  );
}

export default QuizCard;
