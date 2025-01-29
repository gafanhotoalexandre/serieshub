export const SeriesSkeleton = () => {
  return (
    <div className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg animate-pulse">
      <div className="bg-gray-700 h-72 w-full" />
      <div className="p-6">
        <div className="bg-gray-700 h-6 w-3/4 rounded mb-4"></div>
        <div className="bg-gray-700 h-4 w-full rounded mb-2"></div>
        <div className="bg-gray-700 h-4 w-5/6 rounded"></div>
        <div className="mt-4 bg-gray-700 h-10 w-full rounded"></div>
      </div>
    </div>
  )
}
