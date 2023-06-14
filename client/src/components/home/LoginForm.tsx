import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLoginUserMutation, isServerError, useGoogleAuthMutation } from "../../store";

const loginFormValidationSchema = z.object({
  usernameOrEmail: z.string().min(1, { message: "Username or email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValidationSchema = z.infer<typeof loginFormValidationSchema>;

interface LoginFormsProps {
  onClickChangeForm: () => void;
  onSubmitForm: () => void;
}

const LoginForm = ({ onClickChangeForm, onSubmitForm }: LoginFormsProps) => {
  const [loginUser] = useLoginUserMutation();
  const [googleAuth] = useGoogleAuthMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormValidationSchema>({
    resolver: zodResolver(loginFormValidationSchema),
    mode: "onBlur",
  });

  const onSubmitHandler: SubmitHandler<LoginFormValidationSchema> = async (data) => {
    const { usernameOrEmail, password } = data;
    const userCredentials = { usernameOrEmail, password };
    try {
      await loginUser(userCredentials).unwrap();
      onSubmitForm();
    } catch (error) {
      if (error && typeof error === "object" && isServerError(error)) {
        const msg = error.data.message;
        if (error.data.message.startsWith("Username")) {
          setError("usernameOrEmail", { type: "manual", message: msg });
        } else if (error.data.message.startsWith("Password")) {
          setError("password", { type: "manual", message: msg });
        }
      }
    }
  };

  const onSubmitGoogleHandler = async (credentialResponse: CredentialResponse) => {
    try {
      console.log("step 1");
      await googleAuth({ idToken: credentialResponse.credential as string }).unwrap();
      console.log("step 2");

      onSubmitForm();
    } catch (error) {
      console.log(error);

      if (error && typeof error === "object" && isServerError(error)) {
        const msg = error.data.message;
        if (error.data.message.startsWith("Username")) {
          setError("usernameOrEmail", { type: "manual", message: msg });
        } else if (error.data.message.startsWith("Password")) {
          setError("password", { type: "manual", message: msg });
        }
      }
    }
  };

  return (
    <form
      id="loginForm"
      className="h-full flex flex-col justify-between gap-8"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div>
        <h2 className="font-orbitron text-6xl text-indigo-900 text-center font-medium mb-6">
          LOG IN
        </h2>
        <div className="w-full flex flex-col items-center justify-center">
          <GoogleLogin onSuccess={onSubmitGoogleHandler} />
          <div className="w-full flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold text-gray-400 mx-4 mb-0">OR</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <label
              className="font-semibold text-xl text-indigo-900 inline-block mb-0.5"
              htmlFor="userName"
            >
              Username or Email
            </label>
            <input
              className={`w-full p-2 rounded border-2 border-indigo-600 ${
                errors.usernameOrEmail && "border-red-500"
              } appearance-none focus:bg-indigo-200 focus:outline-none focus:shadow-outline transition-colors`}
              placeholder="Enter Username or Email"
              type="text"
              id="userName"
              {...register("usernameOrEmail")}
            ></input>
            <span
              className={`text-xs ${errors.usernameOrEmail ? "text-red-500" : "text-transparent"}`}
            >
              {errors.usernameOrEmail ? errors.usernameOrEmail?.message : "padding"}
            </span>
          </div>

          <div>
            <label
              className="font-semibold text-xl text-indigo-900 inline-block mb-0.5"
              htmlFor="loginPassword"
            >
              Password
            </label>
            <input
              className={`w-full p-2 rounded border-2 border-indigo-600 ${
                errors.password && "border-red-500"
              } appearance-none focus:bg-indigo-200 focus:outline-none focus:shadow-outline transition-colors`}
              autoComplete="off"
              placeholder="Enter Password"
              type="password"
              id="loginPassword"
              {...register("password")}
            ></input>
            <span className={`text-xs ${errors.password ? "text-red-500" : "text-transparent"}`}>
              {errors.password ? errors.password?.message : "padding"}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-primary-800 text-lg transition-all"
          type="submit"
          disabled={isSubmitting}
        >
          Log in
        </button>
      </div>
      <div className="flex justify-center">
        Don't have an account?
        <button
          type="button"
          className="ml-1.5 text-emerald-500 font-semibold underline underline-offset-2 hover:text-emerald-600 active:text-emerald-600 transition"
          onClick={onClickChangeForm}
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
