import { useState, useCallback } from "react";
import Coin from "./components/Coin";
import StatsPanel from "./components/StatsPanel";
import FlipHistory from "./components/FlipHistory";

export default function App() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null);
  const [displayResult, setDisplayResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [streakType, setStreakType] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const flipCoin = () => {
    if (isFlipping) return;

    setShowResult(false);
    const newResult = Math.random() < 0.5 ? "heads" : "tails";
    setResult(newResult);
    setIsFlipping(true);
  };

  const handleFlipEnd = useCallback(() => {
    setIsFlipping(false);
    setDisplayResult(result);
    setShowResult(true);

    if (result) {
      setHistory((prev) => [...prev, result]);

      if (result === "heads") {
        setHeadsCount((prev) => prev + 1);
      } else {
        setTailsCount((prev) => prev + 1);
      }

      if (streakType === result) {
        setCurrentStreak((prev) => prev + 1);
      } else {
        setCurrentStreak(1);
        setStreakType(result);
      }
    }
  }, [result, streakType]);

  const resetStats = () => {
    if (isFlipping) return;
    setHistory([]);
    setHeadsCount(0);
    setTailsCount(0);
    setCurrentStreak(0);
    setStreakType(null);
    setResult(null);
    setDisplayResult(null);
    setShowResult(false);
  };

  const totalFlips = headsCount + tailsCount;

  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-amber-600/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-yellow-500/5 blur-3xl" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Header */}
      <header className="relative z-10 mt-8 text-center sm:mt-12">
        <div className="mb-2 flex items-center justify-center gap-3">
          <span className="text-3xl sm:text-4xl">🪙</span>
          <h1 className="shimmer-text text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Coin Flipper
          </h1>
          <span className="text-3xl sm:text-4xl">🪙</span>
        </div>
        <p className="text-sm text-slate-400 sm:text-base">
          Click the coin or press the button to flip!
        </p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex w-full max-w-2xl flex-1 flex-col items-center gap-8 px-4 py-8 sm:gap-10 sm:py-12">
        {/* Coin Area */}
        <div className="relative flex flex-col items-center gap-8">
          {/* Result Display */}
          <div className="h-12 flex items-center justify-center">
            {showResult && displayResult && (
              <div
                className={`bounce-in flex items-center gap-2 rounded-full px-6 py-2 text-lg font-bold shadow-lg ${
                  displayResult === "heads"
                    ? "bg-yellow-400/20 text-yellow-300 shadow-yellow-500/20"
                    : "bg-orange-400/20 text-orange-300 shadow-orange-500/20"
                }`}
              >
                <span className="text-2xl">
                  {displayResult === "heads" ? "👑" : "🦅"}
                </span>
                <span className="uppercase tracking-wider">
                  {displayResult}!
                </span>
              </div>
            )}
            {!showResult && !isFlipping && (
              <p className="text-slate-500 text-sm animate-pulse">
                {totalFlips === 0 ? "Ready to flip!" : "Flip again!"}
              </p>
            )}
            {isFlipping && (
              <p className="text-slate-400 text-sm animate-pulse">
                Flipping...
              </p>
            )}
          </div>

          {/* The Coin */}
          <div
            className="relative cursor-pointer"
            onClick={flipCoin}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") flipCoin();
            }}
            aria-label="Flip coin"
          >
            {/* Glow ring */}
            {!isFlipping && (
              <div className="pulse-ring absolute inset-[-8px] rounded-full border-2 border-yellow-400/30" />
            )}
            <Coin
              isFlipping={isFlipping}
              result={result}
              onFlipEnd={handleFlipEnd}
            />
          </div>

          {/* Flip Button */}
          <button
            onClick={flipCoin}
            disabled={isFlipping}
            className={`group relative mt-4 overflow-hidden rounded-2xl px-10 py-4 text-lg font-bold uppercase tracking-wider text-white shadow-xl transition-all duration-300 ${
              isFlipping
                ? "cursor-not-allowed bg-slate-700 opacity-50"
                : "bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 shadow-amber-500/30 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/40 active:scale-95"
            }`}
          >
            {!isFlipping && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            )}
            <span className="relative flex items-center gap-2">
              {isFlipping ? (
                <>
                  <svg
                    className="h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Flipping...
                </>
              ) : (
                <>
                  🪙 Flip Coin
                </>
              )}
            </span>
          </button>
        </div>

        {/* Stats Section */}
        <section className="w-full space-y-6">
          <StatsPanel
            totalFlips={totalFlips}
            headsCount={headsCount}
            tailsCount={tailsCount}
            currentStreak={currentStreak}
            streakType={streakType}
          />

          {/* History */}
          <FlipHistory history={history} />

          {/* Reset Button */}
          {totalFlips > 0 && (
            <div className="flex justify-center pt-2">
              <button
                onClick={resetStats}
                disabled={isFlipping}
                className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-400 backdrop-blur-sm transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
              >
                <svg
                  className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Reset All
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 pb-6 text-center text-xs text-slate-600">
        <p>Built with React & Tailwind CSS</p>
      </footer>
    </div>
  );
}
