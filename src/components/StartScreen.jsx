import React, { useState } from "react";

function StartScreen({ onStart }) {
  const [playerName, setPlayerName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim() !== "") {
      onStart(playerName);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-white/70 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center scale-110">
      <h1 className="text-4xl font-bold mb-6 text-teal-700 drop-shadow-md">
        💡 Quiz Mitos vs Fakta
      </h1>
      <p className="text-lg text-gray-700 mb-6">
        Uji pengetahuanmu seputar <strong>Program Studi Bisnis Digital</strong>!  
        Masukkan nama kamu untuk mulai.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
        <input
          type="text"
          placeholder="Masukkan namamu..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="w-full px-5 py-3 mb-6 border-2 border-teal-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg"
        />
        <button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-md transition-all duration-300"
        >
          Mulai Quiz 🚀
        </button>
      </form>
    </div>
  );
}

export default StartScreen;
