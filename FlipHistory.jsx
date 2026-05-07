export default function FlipHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className="slide-up w-full">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">
        Recent Flips
      </h3>
      <div className="flex flex-wrap gap-2">
        {history
          .slice()
          .reverse()
          .slice(0, 20)
          .map((flip, index) => (
            <div
              key={`${index}-${flip}`}
              className={`bounce-in flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold shadow-md transition-all duration-200 hover:scale-110 ${
                flip === "heads"
                  ? "bg-gradient-to-br from-yellow-300 to-amber-500 text-amber-900 shadow-yellow-500/20"
                  : "bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-orange-500/20"
              }`}
              style={{ animationDelay: `${index * 30}ms` }}
              title={flip === "heads" ? "Heads" : "Tails"}
            >
              {flip === "heads" ? "H" : "T"}
            </div>
          ))}
      </div>
    </div>
  );
}
