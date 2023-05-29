const ChatsPage = () => {
  return (
    <div
      className="grid grid-rows-[auto_auto_1fr] bg-gray-50 h-full w-full mx-4 rounded-md shadow-lg"
      style={{ height: "calc(100vh - 2rem)" }}
    >
      <div className="bg-indigo-800 flex p-1 justify-between">
        <h1 className="font-mono text-2xl text-gray-50 font-semibold tracking-tighter drop-shadow-md outlined-text">
          ProgCom
        </h1>
        <div>hello</div>
      </div>
      <div className="grid grid-cols-3">
        <div className="bg-red-900 col-span-1">2</div>
        <div className="bg-green-900 col-span-2">3</div>
      </div>
      <div className="grid grid-cols-3">
        <div className="bg-yellow-900 col-span-1">2</div>
        <div className="bg-orange-900 col-span-2">3</div>
      </div>
    </div>
  );
};

export default ChatsPage;
