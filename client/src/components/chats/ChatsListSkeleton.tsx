import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ChatsListSkeleton = () => {
  const skeletonCount = 13;

  const skeletons = Array.from({ length: skeletonCount }, (_, index) => (
    <Skeleton key={index} height={30} className="mb-2" />
  ));

  return <div>{skeletons}</div>;
};

export default ChatsListSkeleton;
