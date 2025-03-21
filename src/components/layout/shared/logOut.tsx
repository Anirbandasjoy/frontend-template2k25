"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useHandleLogOutMutation } from "@/redux/features/auth/authApi";
import { Outdent } from "lucide-react";

const Logout = ({
  className,
  iconSize,
}: {
  className: string;
  iconSize: number;
}) => {
  const [logOut] = useHandleLogOutMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await logOut().unwrap();
      toast.success("Logged out successfully");
      window.location.href = "/login";
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to log out");
      console.error("Failed to log out", error);
    }
  };

  return (
    <div className="relative">
      <div
        onClick={() => {
          setIsModalOpen(true);
          document.body.style.overflow = "hidden";
        }}
        className={className}
      >
        <span className="text-red-400">LogOut</span>
        <Outdent className="text-red-400" size={iconSize} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-gray-800"
            style={{ opacity: 0.5 }}
          ></div>
          {/* Modal Content */}
          <div className="relative border border-gray-500 bg-gray-900 rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg text-gray-300 font-semibold mb-1 text-center">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-400 text-center mb-5">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  document.body.style.overflow = "auto";
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded w-full cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleLogOut();
                  setIsModalOpen(false);
                  document.body.style.overflow = "auto";
                }}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded w-full cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logout;
