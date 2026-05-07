import { useState, useEffect } from "react";

export default function Coin({ isFlipping, result, onFlipEnd }) {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isFlipping && result) {
      setAnimationClass(
        result === "heads" ? "coin-flip-heads" : "coin-flip-tails"
      );
      const timer = setTimeout(() => {
        onFlipEnd();
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [isFlipping, result, onFlipEnd]);

  return (
    <div className="perspective-1000 flex items-center justify-center">
      {/* Shadow */}
      <div
        className={`absolute bottom-[-30px] h-6 w-40 rounded-[50%] bg-black/20 blur-md ${
          isFlipping ? "coin-shadow-animate" : ""
        }`}
      />

      {/* Coin */}
      <div
        className={`preserve-3d relative h-48 w-48 cursor-pointer transition-transform duration-200 sm:h-56 sm:w-56 md:h-64 md:w-64 ${animationClass}`}
        style={{
          transform:
            !isFlipping && result === "tails"
              ? "rotateX(180deg)"
              : !isFlipping && result === "heads"
              ? "rotateX(0deg)"
              : undefined,
        }}
      >
        {/* Heads Side */}
        <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 shadow-[0_0_40px_rgba(251,191,36,0.4),inset_0_-4px_12px_rgba(0,0,0,0.15),inset_0_4px_12px_rgba(255,255,255,0.3)]">
          <div className="flex h-[90%] w-[90%] flex-col items-center justify-center rounded-full border-4 border-yellow-500/50 bg-gradient-to-br from-yellow-200 via-yellow-300 to-amber-400 shadow-[inset_0_2px_8px_rgba(255,255,255,0.4),inset_0_-2px_8px_rgba(0,0,0,0.1)]">
            <div className="mb-1 text-5xl sm:text-6xl md:text-7xl">👑</div>
            <span className="text-lg font-black tracking-widest text-amber-800 drop-shadow-sm sm:text-xl md:text-2xl">
              HEADS
            </span>
            <div className="mt-1 flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-amber-700/50" />
              <div className="h-1.5 w-6 rounded-full bg-amber-700/40" />
              <div className="h-1 w-1 rounded-full bg-amber-700/50" />
            </div>
          </div>
        </div>

        {/* Tails Side */}
        <div className="backface-hidden rotate-x-180 absolute inset-0 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 shadow-[0_0_40px_rgba(245,158,11,0.4),inset_0_-4px_12px_rgba(0,0,0,0.15),inset_0_4px_12px_rgba(255,255,255,0.3)]">
          <div className="flex h-[90%] w-[90%] flex-col items-center justify-center rounded-full border-4 border-amber-600/50 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-400 shadow-[inset_0_2px_8px_rgba(255,255,255,0.4),inset_0_-2px_8px_rgba(0,0,0,0.1)]">
            <div className="mb-1 text-5xl sm:text-6xl md:text-7xl">🦅</div>
            <span className="text-lg font-black tracking-widest text-orange-900 drop-shadow-sm sm:text-xl md:text-2xl">
              TAILS
            </span>
            <div className="mt-1 flex items-center gap-1">
              <div className="h-1 w-1 rounded-full bg-orange-800/50" />
              <div className="h-1.5 w-6 rounded-full bg-orange-800/40" />
              <div className="h-1 w-1 rounded-full bg-orange-800/50" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
