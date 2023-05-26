const LoginForm = () => {
  return (
    <form className="h-full flex flex-col justify-between gap-8">
      <div>
        <h2 className="text-6xl font-medium mb-6">Log in</h2>
        <div className="flex flex-col justify-between gap-1">
          <div>
            <label className="font-semibold text-lg mb-1" htmlFor="userName">
              Username
            </label>
            <input
              className="w-full p-2 rounded"
              placeholder="Enter Username"
              type="text"
              id="userName"
            ></input>
            <span className="text-xs">""</span>
          </div>
          <div>
            <label className="font-semibold text-lg mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-2 rounded"
              placeholder="Enter Email"
              type="text"
              id="email"
            ></input>
            <span className="text-xs">* Comment</span>
          </div>
          <div>
            <label className="font-semibold text-lg mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-2 rounded"
              placeholder="Enter Password"
              type="text"
              id="password"
            ></input>
            <span className="text-xs">* Comment</span>
          </div>
          <div>
            <label className="font-semibold text-lg mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="w-full p-2 rounded"
              placeholder="Re-enter Password"
              type="text"
              id="confirmPassword"
            ></input>
            <span className="text-xs">* Comment</span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button type="submit">Log in</button>
      </div>
      <div className="flex justify-center">Already a member? Sign in</div>
    </form>
  );
};

export default LoginForm;
