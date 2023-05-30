import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChatsListSkeleton = () => {
  const skeletonCount = 10;

  const skeletons = Array.from({ length: skeletonCount }, (_, index) => <Skeleton key={index} />);

  return <div>{skeletons}</div>;
};

export default ChatsListSkeleton;
