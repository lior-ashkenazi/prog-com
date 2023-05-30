import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState, useAuthUserQuery } from "./store";
import HomeSpinner from "./components/home/HomeSpinner";

const App = () => {
  const navigate = useNavigate();
  const token: string | null = useSelector((state: RootState) => state.auth.token);
  const { isLoading } = useAuthUserQuery();

  useEffect(() => {
    if (token && !isLoading) {
      navigate("/chats");
    }
  }, [token, isLoading, navigate]);

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        if (!e.newValue) {
          // user has logged out
          navigate("/");
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <div className="bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] h-screen w-screen min-w-[75rem] flex items-center justify-center font-sans">
      {isLoading ? <HomeSpinner /> : <Outlet />}
    </div>
  );
};

export default App;
