import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black opacity-90 z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">Please Wait...</p>
      </div>
    </div>
  );
};

export default Loading;
