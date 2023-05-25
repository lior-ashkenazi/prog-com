const LoginForm = () => {
  return (
    <div className="h-full flex flex-col justify-between gap-8">
      <div>
        <h2 className="text-6xl font-medium mb-6">Log in</h2>
        <div className="flex flex-col justify-between gap-1">
          <div>
            <div className="font-semibold text-lg mb-1">Username</div>
            <input className="w-full p-2" placeholder="Enter Username"></input>
            <span className="text-xs">* Comment</span>
          </div>
          <div>
            <div className="font-semibold text-lg mb-1">Email</div>
            <input className="w-full p-2" placeholder="Enter Email"></input>
            <span className="text-xs">* Comment</span>
          </div>
          <div>
            <div className="font-semibold text-lg mb-1">Password</div>
            <input className="w-full p-2" placeholder="Enter Password"></input>
            <span className="text-xs">* Comment</span>
          </div>
          <div>
            <div className="font-semibold text-lg mb-1">Re-Password</div>
            <input className="w-full p-2" placeholder="Re-enter Password"></input>
            <span className="text-xs">* Comment</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button>Log in</button>
      </div>
      <div className="flex justify-center">Already a member? Sign in</div>
    </div>
  );
};

export default LoginForm;
