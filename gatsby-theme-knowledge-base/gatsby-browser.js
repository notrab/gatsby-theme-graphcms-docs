import React from "react";
import { MDXProvider } from "@mdx-js/react";

import { components } from "./src/mdx";
import { NavigationProvider } from "./src/context/navigation";

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);

export const wrapPageElement = ({ element, props }) => {
  const { location } = props;

  return (
    <NavigationProvider currentPath={location.pathname}>
      {element}
    </NavigationProvider>
  );
};
