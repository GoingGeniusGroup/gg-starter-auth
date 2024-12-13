import React from "react";
import { ButtonProps } from "./interface/button.interface";

const SubmitButton = ({ text, isPending, type }: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={isPending}
      className="bg-blue-500 disabled:bg-gray-500 py-2 rounded"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
