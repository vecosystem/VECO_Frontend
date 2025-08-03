const TeamItemSkeleton = () => {
  return (
    <div className="flex items-center mb-[3.2rem] animate-pulse">
      <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
};

export default TeamItemSkeleton;
