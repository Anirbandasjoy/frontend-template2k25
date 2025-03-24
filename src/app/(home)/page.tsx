"use client";
import Logout from "@/components/layout/shared/logOut";
import { useLoggedInUserQuery } from "@/redux/features/users/userApi";
import { ArrowUpRightFromSquareIcon, Lock } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const Home = () => {
  const { data: loggedInUser } = useLoggedInUserQuery();
  const { theme } = useTheme();
  return (
    <div
      className={`flex mt-9 mb-6 justify-center items-center px-4 sm:px-6 lg:px-8 ${
        theme === "dark" ? "text-gray-200" : "text-gray-700"
      }`}
    >
      <div className="max-w-2xl w-full">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-wide  sm:text-left ">
          Welcome to the Frontend Template
        </h1>
        <p
          className={`mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-gray-600  sm:text-left ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          This template is built with Next.js, Redux toolkit, TypeScript,
          Tailwind CSS, and shadcn/ui. It includes a basic navigation bar and a
          dashboard page. You can customize the styles and components as needed.
        </p>

        <div className="mt-3 flex justify-end items-center gap-5">
          {loggedInUser && (
            <Logout
              className="hover:underline flex items-center gap-1 cursor-pointer"
              iconSize={16}
            />
          )}
          <Link
            className="hover:underline flex items-center gap-1 "
            href="/login"
          >
            <span className="text-red-400">Login</span>
            <Lock className="text-red-400" size={16} />
          </Link>
          <Link
            className="hover:underline flex items-center gap-1 "
            href="/signup"
          >
            <span className="text-green-400">SignUp</span>
            <ArrowUpRightFromSquareIcon className="text-green-400" size={16} />
          </Link>
          <Link
            className="hover:underline flex items-center gap-1 "
            href="/dashboard"
            onClick={() => toast.success("Navigating to Dashboard...")}
          >
            <span className="text-blue-400">Dashboard</span>
            <ArrowUpRightFromSquareIcon className="text-blue-400" size={16} />
          </Link>
        </div>
        <div className="mt-6 sm:mt-8 text-left">
          <h2 className="text-lg sm:text-xl font-medium">
            📌 Installation Guide
          </h2>
          <p className="mt-2 sm:mt-4 text-sm sm:text-[16px]">
            Follow these steps to set up the project:
          </p>

          {/* Clone Repository */}
          <div className="mt-4 bg-gray-100 p-3 sm:p-4 rounded">
            <p className="font-mono text-xs sm:text-sm">
              # Clone the repository with SSH
            </p>
            <pre className="bg-gray-200 p-2 sm:p-3 mt-1 rounded text-xs sm:text-sm overflow-x-auto">
              <code>
                git clone git@github.com:Anirbandasjoy/frontend-template2k25.git
              </code>
            </pre>
          </div>
          <div className="mt-4 bg-gray-100 p-3 sm:p-4 rounded">
            <p className="font-mono text-xs sm:text-sm">
              # Clone the repository HTTPS
            </p>
            <pre className="bg-gray-200 p-2 sm:p-3 mt-1 rounded text-xs sm:text-sm overflow-x-auto">
              <code>
                git clone
                https://github.com/Anirbandasjoy/frontend-template2k25.git
              </code>
            </pre>
          </div>

          {/* Navigate to Folder */}
          <div className="mt-4 bg-gray-100 p-3 sm:p-4 rounded">
            <p className="font-mono text-xs sm:text-sm">
              # Navigate to the project folder
            </p>
            <pre className="bg-gray-200 p-2 sm:p-3 mt-1 rounded text-xs sm:text-sm overflow-x-auto">
              <code>cd frontend-template2k25</code>
            </pre>
          </div>

          {/* Install Dependencies */}
          <div className="mt-4 bg-gray-100 p-3 sm:p-4 rounded">
            <p className="font-mono text-xs sm:text-sm">
              # Install dependencies
            </p>
            <pre className="bg-gray-200 p-2 sm:p-3 mt-1 rounded text-xs sm:text-sm overflow-x-auto">
              <code>
                yarn <br /># or
                <br />
                npm install
              </code>
            </pre>
          </div>

          {/* Start Development Server */}
          <div className="mt-4 bg-gray-100 p-3 sm:p-4 rounded">
            <p className="font-mono text-xs sm:text-sm">
              # Start the development server
            </p>
            <pre className="bg-gray-200 p-2 sm:p-3 mt-1 rounded text-xs sm:text-sm overflow-x-auto">
              <code>
                yarn dev
                <br /># or
                <br />
                npm run dev
              </code>
            </pre>
          </div>

          {/* GitHub Repository Link */}
          <p className="mt-6 text-sm sm:text-lg text-center sm:text-left">
            📎 GitHub Repository:{" "}
            <a
              href="https://github.com/Anirbandasjoy/frontend-template2k25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
