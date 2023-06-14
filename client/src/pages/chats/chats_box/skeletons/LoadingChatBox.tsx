import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingChatBox = () => {
  return (
    <>
      <div className="col-span-2 px-4 flex items-center gap-x-4">
        <Skeleton circle={true} width={50} height={50} />
        <Skeleton width={120} height={40} />
      </div>
      <div className="col-span-2 grid grid grid-rows-[400px_auto] overflow-y-auto">
        <div className="bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] overflow-y-auto p-4 border-r-8 border-r-gray-100 flex justify-end">
          <Skeleton
            width={500}
            height={50}
            count={6}
            style={{
              opacity: 0.9,
              marginBottom: "0.5rem",
            }}
          />
        </div>
        <div className="pt-7 pb-5 px-8 flex justify-center items-center">
          <Skeleton height={100} width={800} />
        </div>
      </div>
    </>
  );
};

export default LoadingChatBox;
