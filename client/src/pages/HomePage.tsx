import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../store";
import RegisterForm from "../components/home/RegisterForm";
import LoginForm from "../components/home/LoginForm";

const HomePage = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleIsLoginClick = () => setIsLogin(!isLogin);

  useEffect(() => {
    // should in redux store!
    // if (token) {
    //   navigate("/chats");
    // }
  }, [dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center gap-y-10">
      <h1 className="font-mono text-8xl text-gray-100 font-semibold tracking-tighter drop-shadow-md outlined-text">
        ProgCom
      </h1>
      <div className="items-center justify-center bg-gray-100 w-[28rem] rounded-md shadow-md p-8">
        {isLogin ? (
          <LoginForm onClickSignup={handleIsLoginClick} />
        ) : (
          <RegisterForm onClickLogin={handleIsLoginClick} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
