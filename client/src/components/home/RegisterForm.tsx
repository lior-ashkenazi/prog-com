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
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValidationSchema>({
    resolver: zodResolver(loginFormValidationSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValidationSchema> = (data) => {
    console.log(data);
  };

  return (
    <form className="h-full flex flex-col justify-between gap-8" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-6xl font-medium mb-6">Sign up</h2>
        <div className="flex flex-col justify-between">
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="userName">
              Username
            </label>
            <input
              className={`w-full p-2 rounded border-2 border-gray-600 ${
                errors.userName && "border-red-500"
              } appearance-none focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors`}
              placeholder="Enter Username"
              type="text"
              id="userName"
              {...register("userName")}
            ></input>
            <span className={`text-xs ${errors.userName ? "text-red-500" : "text-transparent"}`}>
              {errors.userName ? errors.userName?.message : "padding"}
            </span>
          </div>
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="email">
              Email
            </label>
            <input
              className={`w-full p-2 rounded border-2 border-gray-600 ${
                errors.email && "border-red-500"
              } appearance-none focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors`}
              placeholder="Enter Email"
              type="text"
              id="email"
              {...register("email")}
            ></input>
            <span className={`text-xs ${errors.email ? "text-red-500" : "text-transparent"}`}>
              {errors.email ? errors.email?.message : "padding"}
            </span>
          </div>
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="password">
              Password
            </label>
            <input
              className={`w-full p-2 rounded border-2 border-gray-600 ${
                errors.password && "border-red-500"
              } appearance-none focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors`}
              placeholder="Enter Password"
              type="password"
              id="password"
              {...register("password")}
            ></input>
            <span className={`text-xs ${errors.password ? "text-red-500" : "text-transparent"}`}>
              {errors.password ? errors.password?.message : "padding"}
            </span>
          </div>
          <div>
            <label className="font-semibold text-xl inline-block mb-0.5" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`w-full p-2 rounded border-2 border-gray-600 ${
                errors.confirmPassword && "border-red-500"
              } appearance-none focus:bg-gray-200 focus:outline-none focus:shadow-outline transition-colors`}
              placeholder="Re-enter Password"
              type="password"
              id="confirmPassword"
              {...register("confirmPassword")}
            ></input>
            <span
              className={`text-xs ${errors.confirmPassword ? "text-red-500" : "text-transparent"}`}
            >
              {errors.confirmPassword ? errors.confirmPassword?.message : "padding"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-primary-800 text-lg transition-all"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
        >
          Create an account
        </button>
      </div>
      <div className="flex justify-center">Already a member? Log in</div>
    </form>
  );
};

export default LoginForm;
