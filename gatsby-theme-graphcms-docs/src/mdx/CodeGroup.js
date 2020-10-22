import React from "react";

export const CodeGroup = ({ children }) => {
  if (!children.length) return children;

  return (
    <div className="bg-gray-900 rounded">
      <div className="">
        <div className="space-x-4">
          {/* <button className="appearance-none px-4 py-2 rounded bg-primary-700 text-white shadow">
            Request
          </button>
          <button className="appearance-none px-4 py-2 rounded bg-primary-800 text-white">
            Response
          </button> */}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};
