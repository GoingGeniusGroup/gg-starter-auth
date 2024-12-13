"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        // Default options for all toasts
        duration: 5000,
        style: {
          background: "#363636",
          color: "#fff",
        },
        // Custom success styles
        success: {
          duration: 3000,
          style: {
            background: "#059669",
          },
        },
        // Custom error styles
        error: {
          duration: 4000,
          style: {
            background: "#DC2626",
          },
        },
      }}
    />
  );
};
