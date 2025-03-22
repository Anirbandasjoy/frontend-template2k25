"use client";

import Loading from "@/components/layout/home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleLoginMutation } from "@/redux/features/auth/authApi";
import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const [setLoadingData, { isLoading }] = useHandleLoginMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };

    try {
      await setLoadingData(loginInfo).unwrap();
      router.push("/");
      toast.success("Logged in successfully");
    } catch (error: any) {
      console.error("Error login", error);

      toast.error(error?.data?.message || "Failure login");
    }
  };

  const handleGithubSignIn = () => {
    console.log("Sign in with GitHub");
  };

  return (
    <PublicRoute>
      {isLoading && <Loading />}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-6 bg-white rounded-2xl">
          <h2 className="text-2xl font-semibold text-gray-700 text-center">
            Sign In Your account
          </h2>
          <p className="text-gray-500 text-center text-[14px] mb-6 mt-1">
            Enter your email and Password below to sign in your account
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-xs ml-1 text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}

              <Input
                type="password"
                placeholder="Enter your Password"
                className="w-full mt-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                })}
              />

              {errors.password && (
                <p className="text-xs ml-1 text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full mt-3 bg-black text-white py-2 rounded-sm cursor-pointer hover:bg-gray-900"
              >
                Sign In with Email
              </Button>
            </div>

            <p className="text-[12px] text-gray-500 mt-3">
              Forgot your password?{" "}
              <Link
                href="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Reset it here
              </Link>
            </p>
          </form>

          <div className="relative flex items-center my-4">
            <span className="w-full border-t"></span>
            <span className="px-3 text-gray-500 text-sm text-nowrap">
              OR CONTINUE WITH
            </span>
            <span className="w-full border-t"></span>
          </div>
          {/* form submittion button */}

          <Button
            onClick={handleGithubSignIn}
            className="w-full flex items-center bg-transparent justify-center gap-2 text-gray-700 border border-gray-200 cursor-pointer py-2 rounded-sm hover:bg-gray-300"
          >
            <Github className="text-lg" /> GitHub
          </Button>

          <p className="text-xs text-center text-gray-500 mt-4">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
          <div className="text-center mt-2">
            <p className="text-[12px] text-gray-500">
              Don not have an account?{" "}
              <Link href="/signup" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PublicRoute>
  );
};

export default Login;
