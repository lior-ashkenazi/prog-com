import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { MemoryRouter, Routes, Route, useNavigate, NavigateFunction } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { AppDispatch, setToken } from "./store";
// import ChatsPage from "./pages/ChatsPage";

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("prog-com-jwt");
    if (token) {
      dispatch(setToken(token));
      navigate("/chats");
    }
  }, [dispatch, navigate]);

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
