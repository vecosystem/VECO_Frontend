import ListItemSkeleton from './ListViewItemSkeleton';

const ListViewItemSkeletonList = ({ count = 10 }: { count?: number }) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <ListItemSkeleton key={idx} />
      ))}
    </>
  );
};

export default ListViewItemSkeletonList;
