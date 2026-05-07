export default function StatsPanel({
  totalFlips,
  headsCount,
  tailsCount,
  currentStreak,
  streakType,
}) {
  const headsPercent = totalFlips > 0 ? ((headsCount / totalFlips) * 100).toFixed(1) : "0.0";
  const tailsPercent = totalFlips > 0 ? ((tailsCount / totalFlips) * 100).toFixed(1) : "0.0";

  return (
    <div className="slide-up grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {/* Total Flips */}
      <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/5">
        <div className="absolute -right-2 -top-2 text-4xl opacity-10 transition-transform duration-300 group-hover:scale-110">
          🎯
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Total Flips
        </p>
        <p className="mt-1 text-3xl font-bold text-white">{totalFlips}</p>
      </div>

      {/* Heads */}
      <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-yellow-500/5">
        <div className="absolute -right-2 -top-2 text-4xl opacity-10 transition-transform duration-300 group-hover:scale-110">
          👑
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-yellow-400/80">
          Heads
        </p>
        <p className="mt-1 text-3xl font-bold text-yellow-400">{headsCount}</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 transition-all duration-700 ease-out"
            style={{ width: `${headsPercent}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">{headsPercent}%</p>
      </div>

      {/* Tails */}
      <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-orange-500/5">
        <div className="absolute -right-2 -top-2 text-4xl opacity-10 transition-transform duration-300 group-hover:scale-110">
          🦅
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-orange-400/80">
          Tails
        </p>
        <p className="mt-1 text-3xl font-bold text-orange-400">{tailsCount}</p>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-700 ease-out"
            style={{ width: `${tailsPercent}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">{tailsPercent}%</p>
      </div>

      {/* Streak */}
      <div className="group relative overflow-hidden rounded-2xl bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-emerald-500/5">
        <div className="absolute -right-2 -top-2 text-4xl opacity-10 transition-transform duration-300 group-hover:scale-110">
          🔥
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-emerald-400/80">
          Streak
        </p>
        <p className="mt-1 text-3xl font-bold text-emerald-400">
          {currentStreak}
        </p>
        {streakType && (
          <p className="mt-1 text-xs capitalize text-slate-500">
            {streakType} in a row
          </p>
        )}
      </div>
    </div>
  );
}
