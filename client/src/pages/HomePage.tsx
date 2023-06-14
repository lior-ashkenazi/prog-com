import { useState } from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import RegisterForm from "../components/home/RegisterForm";
import LoginForm from "../components/home/LoginForm";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

const HomePage = () => {
  const navigate: NavigateFunction = useNavigate();

  const [isLogin, setIsLogin] = useState<boolean>(true);

  const onClickChangeForm = () => setIsLogin(!isLogin);

  const onSubmitForm = () => {
    navigate("/chats");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="flex w-full justify-evenly items-center">
        <h1 className="font-orbitron text-[10rem] text-gray-50 font-semibold tracking-tighter">
          ProgCom
        </h1>
        <div className="flex flex-col items-center justify-center bg-gray-50 w-[28rem] rounded-md shadow-lg p-8">
          {isLogin ? (
            <LoginForm onClickChangeForm={onClickChangeForm} onSubmitForm={onSubmitForm} />
          ) : (
            <RegisterForm onClickChangeForm={onClickChangeForm} onSubmitForm={onSubmitForm} />
          )}
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default HomePage;
