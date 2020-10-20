import React from "react";
import { MDXProvider } from "@mdx-js/react";

import { components } from "./src/mdx";

export const wrapRootElement = ({ element }) => (
  <MDXProvider components={components}>{element}</MDXProvider>
);
