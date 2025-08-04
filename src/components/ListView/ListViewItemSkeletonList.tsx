import ListItemSkeleton from './ListViewItemSkeleton';

const ListViewItemSkeletonList = () => {
  return (
    <>
      {new Array(10).fill(0).map((_, idx) => (
        <ListItemSkeleton key={idx} />
      ))}
    </>
  );
};

export default ListViewItemSkeletonList;
