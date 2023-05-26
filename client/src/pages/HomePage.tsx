import { useState } from "react";
import LoginForm from "../components/home/RegisterForm";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center justify-center gap-y-10">
      <h1 className="font-mono text-8xl text-gray-100 font-semibold tracking-tighter drop-shadow-md outlined-text">
        ProgCom
      </h1>
      <div className="items-center justify-center bg-gray-100 w-[28rem] rounded-md shadow-md p-8">
        <LoginForm />
        {/* isLogin ? <LoginForm />  */}
      </div>
    </div>
  );
};

export default HomePage;
