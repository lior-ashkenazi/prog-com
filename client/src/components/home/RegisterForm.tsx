import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginFormValidationSchema = z
  .object({
    userName: z.string().min(1, { message: "Username is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Email is not valid" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Confirm Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

type LoginFormValidationSchema = z.infer<typeof loginFormValidationSchema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValidationSchema>({
    resolver: zodResolver(loginFormValidationSchema),
  });

  return (
    <form className="h-full flex flex-col justify-between gap-8">
      <div>
        <h2 className="text-6xl font-medium mb-6">Sign up</h2>
        <div className="flex flex-col justify-between gap-1">
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="userName">
              Username
            </label>
            <input
              className={`w-full p-2 rounded border appearance-none focus:outline-none focus:shadow-outline`}
              placeholder="Enter Username"
              type="text"
              id="userName"
            ></input>
            <span className="text-xs">""</span>
          </div>
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full p-2 rounded border appearance-none focus:outline-none focus:shadow-outline`}
              placeholder="Enter Email"
              type="text"
              id="email"
            ></input>
            <span className="text-xs">* Comment</span>
          </div>
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full p-2 rounded border appearance-none focus:outline-none focus:shadow-outline`}
              placeholder="Enter Password"
              type="text"
              id="password"
            ></input>
            <span className="text-xs">* Comment</span>
          </div>
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`w-full p-2 rounded border appearance-none focus:outline-none focus:shadow-outline`}
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
