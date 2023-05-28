import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { RootState, useAuthUserQuery } from "./store";

const App = () => {
  const navigate = useNavigate();
  const token: string | null = useSelector((state: RootState) => state.auth.token);
  useAuthUserQuery();

  useEffect(() => {
    if (token) {
      navigate("/chats");
    }
  }, [token, navigate]);

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
    <div className="bg-[url('assets/random-shapes.svg')] bg-indigo-500 bg-[length:3.5rem_3.5rem] h-screen w-screen flex items-center justify-center font-sans">
      <Outlet />
    </div>
  );
};

export default App;
