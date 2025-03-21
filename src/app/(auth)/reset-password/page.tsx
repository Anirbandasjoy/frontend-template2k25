"use client";

import Loading from "@/components/layout/home/shared/loading";
import PublicRoute from "@/components/layout/shared/PublicRouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHandleResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Github } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormData = {
  password: string;
};

const ResetPassword = () => {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [resetPasswordData, { isLoading }] = useHandleResetPasswordMutation();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast.error("Token not found in the URL");
    }
  }, [searchParams]);

  const onSubmit = async (data: FormData) => {
    if (!token) {
      toast.error("Token is missing. Please try again.");
      return;
    }
    const userInfo = {
      password: data.password,
      token,
    };

    try {
      await resetPasswordData(userInfo).unwrap();
      router.push("/login");
      toast.success("Password reset successfully");
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
            Reset Your Account Password
          </h2>
          <p className="text-gray-500 text-center text-[14px] mb-6 mt-1">
            Enter your New Password below to reset your account password
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
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
                Reset Your Password
              </Button>
            </div>

            <p className="text-[12px] text-gray-500 mt-3">
              Back to the Login?{" "}
              <Link href="/login" className="text-blue-500 hover:underline">
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
        </div>
      </div>
    </PublicRoute>
  );
};

export default dynamic(() => Promise.resolve(ResetPassword), { ssr: false });
