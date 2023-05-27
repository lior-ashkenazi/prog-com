import { MemoryRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import ChatsPage from "./pages/ChatsPage";

const App = () => {
  return (
    <MemoryRouter>
      <div className="bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] h-screen w-screen flex items-center justify-center font-sans">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          {/* <Route path="/chats" element={<ChatsPage />}></Route> */}
        </Routes>
      </div>
    </MemoryRouter>
  );
};

export default App;
