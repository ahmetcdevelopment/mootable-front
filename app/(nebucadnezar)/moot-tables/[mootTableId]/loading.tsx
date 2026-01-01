export default function MootTableLoading() {
  return (
    <div className="flex flex-col h-screen animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center px-4 h-14 border-b border-moot-surfaceLight">
        <div className="w-5 h-5 bg-moot-surfaceLight rounded mr-2" />
        <div className="w-24 h-5 bg-moot-surfaceLight rounded" />
      </div>

      {/* Messages skeleton */}
      <div className="flex-1 p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-10 h-10 bg-moot-surfaceLight rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="w-32 h-4 bg-moot-surfaceLight rounded" />
              <div className="w-full h-4 bg-moot-surfaceLight rounded" />
              <div className="w-3/4 h-4 bg-moot-surfaceLight rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Input skeleton */}
      <div className="p-4 border-t border-moot-surfaceLight">
        <div className="w-full h-10 bg-moot-surfaceLight rounded-lg" />
      </div>
    </div>
  );
}
