import { useState, useEffect } from "react";

function App() {
  const [meme, setMeme] = useState({});

  async function getMeme() {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const data = await response.json();

    const memes = data.data.memes;
    const randomIndex = Math.floor(Math.random() * memes.length);
    setMeme(memes[randomIndex]);
  }

  async function downloadMeme() {
    if (!meme.url) return;
    const response = await fetch(meme.url);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = meme.name + ".jpg";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  useEffect(() => {
    getMeme();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      {/* Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Meme Generator
        </h1>

        {/* Image */}
        {meme.url && (
          <img
            src={meme.url}
            alt="meme"
            className="w-full rounded-xl object-cover"
          />
        )}

        {/* Buttons */}
        <div className="flex gap-3 mt-5">

          <button
            onClick={getMeme}
            className="flex-1 bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            New Meme
          </button>

          <button
            onClick={downloadMeme}
            className="flex-1 border border-gray-300 py-2 rounded-lg font-medium hover:bg-gray-100 transition"
          >
            Download
          </button>

        </div>
      </div>

      {/* Footer */}
      <p className="text-sm text-gray-500 mt-4 font-semibold">
        Warning: May cause laughter!!!
      </p>
    </div>
  );
}

export default App;