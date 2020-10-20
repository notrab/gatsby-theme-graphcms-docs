import React from "react";
import cc from "classcat";

export default function Alert({ type = "default", children }) {
  return (
    <div
      className={cc([
        "alert border-l-4 my-4 px-4 py-px",
        {
          "border-primary-400 bg-primary-50": type === "default",
        },
        {
          "border-primary-400 bg-primary-50": type === "info",
        },
        {
          "border-orange-500 bg-orange-200": type === "warning",
        },
      ])}
    >
      {children}
    </div>
  );
}
