import React from "react";

export const CodeGroup = ({ children }) => {
  if (!children.length) return children;

  const test = children.reduce((acc, child) => {
    const codeblocks = child.props.mdxType;
    console.log({ child });

    if (codeblocks) {
      return [...acc, child];
    }

    return acc;
  }, []);

  console.log(test);

  return (
    <div className="bg-primary-900 rounded">
      <div className="p-4 bg-primary-800 rounded-t">
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
