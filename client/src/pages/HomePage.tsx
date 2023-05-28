import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import RegisterForm from "../components/home/RegisterForm";
import LoginForm from "../components/home/LoginForm";

const HomePage = () => {
  const navigate: NavigateFunction = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const onClickChangeForm = () => setIsLogin(!isLogin);

  const onSubmitForm = () => {
    navigate("/chats");
  };

  return (
    <div className="flex w-full justify-evenly items-center">
      <h1 className="font-mono text-[10rem] text-gray-50 font-semibold tracking-tighter drop-shadow-md outlined-text">
        ProgCom
      </h1>
      <div className="items-center justify-center bg-gray-50 w-[28rem] rounded-md shadow-lg p-8">
        {isLogin ? (
          <LoginForm onClickChangeForm={onClickChangeForm} onSubmitForm={onSubmitForm} />
        ) : (
          <RegisterForm onClickChangeForm={onClickChangeForm} onSubmitForm={onSubmitForm} />
        )}
      </div>
    </div>
  );
};

export default HomePage;
