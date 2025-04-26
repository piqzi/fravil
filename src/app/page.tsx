"use client";
import { useState } from "react";
import { exerciseInfoMap } from "../../exercise_info";

export default function Home() {
  const [time, setTime] = useState(15);
  const [space, setSpace] = useState(5);
  const [mood, setMood] = useState("happy");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allowedMoods = [
    "happy",
    "sad",
    "tired",
    "stressed",
    "bored",
    "anxious",
    "focused",
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time,
          space,
          mood,
        }),
      });

      const data = await res.json();
      console.log(res.status, res.text)

      if (res.ok) {
        setResult(data.exercise);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch (err) {
      setError("Failed to connect to backend.");
      console.log("something's wrong dude");
    }

    setLoading(false);
  };

  return (
    <>
      <main className="w-screen min-h-screen flex flex-col gap-6 items-center justify-center p-6">
        <header className="w-max px-6 py-4 bg-stone-900 text-white shadow flex gap-6 justify-between items-center">
          <h1 className="text-xl font-bold">
            Fravil: Micro-workout suggestion
          </h1>
        </header>
        <div className="w-full max-w-md flex flex-col gap-4 text-center p-6 rounded-xl shadow-lg bg-stone-800">
          <h2 className="text-3xl font-bold mb-4 text-white">Recommender</h2>

          <label className="text-white text-left">
            Time (minutes)
            <input
              type="range"
              min={1}
              max={30}
              value={time}
              onChange={(e) => setTime(Number(e.target.value))}
              className="w-full"
            />
            <span className="block text-sm mt-1 text-stone-300">
              {time} minutes
            </span>
          </label>

          <label className="text-white text-left">
            Space (sqft)
            <input
              type="range"
              min={1}
              max={10}
              value={space}
              onChange={(e) => setSpace(Number(e.target.value))}
              className="w-full"
            />
            <span className="block text-sm mt-1 text-stone-300">
              {space} sqft
            </span>
          </label>

          <label className="text-white text-left">
            Mood
            <select
              className="w-full p-2 text-black rounded mt-1"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              {allowedMoods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </label>

          <button
            className="mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Thinking..." : "Get Exercise"}
          </button>

          {result && exerciseInfoMap[result] && (
            <div className="mt-6 text-left bg-stone-700 p-4 rounded">
              <h2 className="text-xl font-semibold text-green-400">
                💡 Recommended: {exerciseInfoMap[result].name}
              </h2>
              <p className="mt-2 text-stone-200">
                {exerciseInfoMap[result].description}
              </p>
              <a
                href={
                  exerciseInfoMap[result].links[
                    Math.floor(
                      Math.random() * exerciseInfoMap[result].links.length
                    )
                  ]
                }
                className="text-blue-400 underline block mt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more →
              </a>
            </div>
          )}

          {error && <p className="mt-4 text-red-500">❌ {error}</p>}
        </div>
      </main>
    </>
  );
}
