const ListItemSkeleton = () => {
  return (
    <div className="flex justify-between items-center h-[5.6rem] px-[3.2rem] -mx-[3.2rem] animate-pulse">
      <div className="flex items-center gap-[0.8rem]">
        <div className="bg-gray-200 w-[6rem] h-[1.8rem] ml-[2.4rem] rounded-full" />
        <div className="bg-gray-200 w-[2.4rem] h-[2.4rem] rounded-md" />
        <div className="bg-gray-200 w-[12rem] h-[1.8rem] rounded-full" />
      </div>
      <div className="flex gap-[2.4rem] items-center">
        <div className="flex gap-[2.4rem] items-center">
          <div className="bg-gray-200 w-[12rem] h-[1.8rem] rounded-full" />
          <div className="bg-gray-200 w-[12rem] h-[1.8rem] rounded-full" />
        </div>
        <div className="flex gap-[0.8rem] items-center relative">
          <div className="bg-gray-200 w-[2.4rem] h-[2.4rem] rounded-full z-2" />
          <div className="bg-gray-200 w-[8rem] h-[1.8rem] rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default ListItemSkeleton;
