"use client";

import PublicRoute from "@/components/layout/shared/PublicRouter";
import { useHandleSingUpMutation } from "@/redux/features/users/userApi";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaSpinner, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ActiveAccount = () => {
  const [token, setToken] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const queryToken = searchParams.get("token");
    if (queryToken) {
      setToken(queryToken);
    } else {
      toast.error("Token not found in the URL");
    }
  }, [searchParams]);
  const [setActiveAccount] = useHandleSingUpMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const [activationSuccess, setActivationSuccess] = useState<boolean | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const activateAccount = async () => {
      if (token) {
        setLoading(true);
        try {
          await setActiveAccount({ token }).unwrap();
          setActivationSuccess(true);
          setTimeout(() => router.push("/"), 2000);
        } catch (error: any) {
          console.log(error);
          toast.error(error?.data?.payload?.message || "Failed activation");
          setActivationSuccess(false);
        } finally {
          setLoading(false);
        }
      }
    };

    activateAccount();
  }, [token, setActiveAccount, router]);

  return (
    <PublicRoute>
      <div className="flex items-center justify-center h-screen bg-[#171717]">
        <div
          className={`text-center p-8 rounded-xl shadow-lg transition-all duration-700 transform ${
            loading
              ? "bg-[#1e1e1e] animate-pulse"
              : activationSuccess === true
              ? "bg-[#2f3f2f] scale-105"
              : activationSuccess === false
              ? "bg-[#3a2b2b] scale-95"
              : "bg-[#222222]"
          } max-w-lg w-full`}
        >
          <div className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500">
            Account Activation
          </div>
          <div className="mt-4">
            {loading ? (
              <div className="text-xl font-semibold text-blue-600 flex justify-center items-center space-x-2 animate-pulse">
                <FaSpinner className="animate-spin" size={24} />
                <span>Activating your account...</span>
              </div>
            ) : activationSuccess === null ? (
              <div className="text-xl font-semibold text-gray-400 animate-pulse">
                Activating...
              </div>
            ) : activationSuccess ? (
              <div className="text-xl font-semibold text-green-500 flex justify-center items-center space-x-2">
                <FaCheckCircle
                  className="text-green-400 animate-bounce"
                  size={24}
                />
                <span>Account activated successfully!</span>
              </div>
            ) : (
              <div className="text-xl font-semibold text-red-500 flex justify-center items-center space-x-2 animate-shake">
                <FaTimesCircle className="text-red-400" size={24} />
                <span>Activation failed. Please try again.</span>
              </div>
            )}
          </div>
          {/* <div className="mt-6">
          {!loading && activationSuccess !== null && (
            <div className="text-lg text-gray-300">
              <button
                onClick={() => router.push("/singup")}
                className="px-6 py-2 mt-4  text-white rounded-full shadow-lg   bg-red-400 "
              >
                SingUp
              </button>
            </div>
          )}
        </div> */}
        </div>
      </div>
    </PublicRoute>
  );
};

export default dynamic(() => Promise.resolve(ActiveAccount), { ssr: false });
