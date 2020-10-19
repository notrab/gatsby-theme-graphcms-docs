import React from "react";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import Layout from "../components/Layout";

export default function DocPage({ pageContext: { node, previous, next } }) {
  return (
    <Layout>
      <h1>{node.childMdx.frontmatter.title}</h1>

      <MDXRenderer>{node.childMdx.body}</MDXRenderer>

      {(previous || next) && (
        <div>
          {previous && (
            <Link to={`/${previous.childMdx.fields.slug}`}>
              &larr; {previous.childMdx.frontmatter.title}
            </Link>
          )}
          {next && (
            <Link to={`/${next.childMdx.fields.slug}`}>
              {next.childMdx.frontmatter.title} &rarr;
            </Link>
          )}
        </div>
      )}
    </Layout>
  );
}
