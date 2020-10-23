import React from "react";
import cc from "classcat";

function Icon({ type = "default" }) {
  if (!type === "default") return null;

  switch (type) {
    case "warning":
      return (
        <span className="flex-no-shrink pt-6">
          <svg
            className="fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" />
          </svg>
        </span>
      );
    case "danger":
      return (
        <span className="flex-no-shrink pt-6">
          <svg
            className="fill-current w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" />
          </svg>
        </span>
      );
    default:
      return null;
  }
}

export default function Alert({ type = "default", children }) {
  return (
    <div
      className={cc([
        "border-l-4 mb-8 px-4 py-px flex space-x-3",
        {
          "border-primary-400 bg-primary-50 dark:bg-primary-800 text-primary-400 dark:text-primary-100":
            type === "default",
        },
        {
          "border-orange-500 bg-orange-100 dark:bg-orange-900 text-orange-500 dark:text-orange-300":
            type === "warning",
        },
        {
          "border-red-500 bg-red-100 text-red-500": type === "danger",
        },
      ])}
    >
      <Icon type={type} />
      {children}
    </div>
  );
}
