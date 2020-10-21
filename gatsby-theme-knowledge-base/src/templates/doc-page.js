import React from "react";
import { Link } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import cc from "classcat";
import slugify from "@sindresorhus/slugify";

import { useNavigationState } from "../context/navigation";
import Logo from "../components/Logo";

import "../styles/main.css";

export default function DocPage({
  pageContext: { node, previous, next, navItems },
}) {
  const { currentPath } = useNavigationState();
  const { frontmatter, body, headings } = node.childMdx;
  const { title, disablePagination } = frontmatter;

  console.log(currentPath);

  return (
    <div className="pt-16 min-h-screen">
      <header className="fixed top-0 z-40 w-full bg-white shadow-sm border-b">
        <div className="container mx-auto h-16 px-6 flex items-center">
          <Logo />
        </div>
      </header>
      <main className="container mx-auto">
        <div
          className="flex flex-wrap relative px-6"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <aside className="w-full lg:w-1/5 lg:block fixed lg:relative inset-0 mt-16 lg:mt-0 bg-white hidden sidebar">
            <div
              className="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto z-20"
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <div className="lg:py-8 pr-8">
                {navItems.group.map(({ fieldValue, nodes }, index) => {
                  return (
                    <div key={index} className="mb-4">
                      {fieldValue && (
                        <p className="p-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">
                          {fieldValue}
                        </p>
                      )}

                      <ul>
                        {nodes.map(({ childMdx, id }) => (
                          <li key={id} className="text-gray-700">
                            <Link
                              to={`/${childMdx?.fields?.slug}`}
                              className={cc([
                                "px-2 py-1 hover:text-primary-500 flex items-center justify-between",
                                {
                                  "text-primary-500 bg-primary-100 rounded":
                                    `/${childMdx?.fields?.slug}` ===
                                    currentPath,
                                },
                              ])}
                            >
                              {childMdx?.frontmatter?.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
          <div className="flex flex-wrap w-full lg:w-4/5">
            <div className="w-full lg:w-3/4 py-4 lg:pt-8 lg:pb-4 lg:border-l lg:border-r">
              <div className="lg:px-8">
                <div className="max-w-none prose">
                  <h1 className="flex items-center justify-between">{title}</h1>
                  <MDXRenderer>{body}</MDXRenderer>
                </div>
              </div>
              {(previous || next) && !disablePagination && (
                <div className="pt-4 lg:pt-8">
                  <div className="flex justify-between items-center border-t md:px-8 pt-4 pb-0">
                    {previous ? (
                      <Link
                        to={`/${previous.childMdx.fields.slug}`}
                        className="text-primary-500 font-medium"
                      >
                        &larr; {previous.childMdx.frontmatter.title}
                      </Link>
                    ) : (
                      <span />
                    )}
                    {next && (
                      <Link
                        to={`/${next.childMdx.fields.slug}`}
                        className="text-primary-500 font-medium"
                      >
                        {next.childMdx.frontmatter.title} &rarr;
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full lg:w-1/4 py-4 lg:pt-8 lg:pb-4">
              <div className="lg:px-8 lg:sticky lg:top-16 pt-8">
                {headings?.length > 0 && (
                  <>
                    <p className="py-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">
                      On this page
                    </p>

                    <ul>
                      {headings.map(({ value, depth }) => {
                        const href = slugify(value, {
                          customReplacements: [["/", ""]],
                          decamelize: false,
                        });

                        return (
                          <li key={value}>
                            <a
                              href={`#${href}`}
                              className={cc([
                                "text-gray-800 hover:text-primary-500 py-1 text-sm transition-transform ease-in-out duration-300 transform hover:translate-x-1",
                                {
                                  "pl-2": depth === 3,
                                },
                              ])}
                            >
                              {value}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                <footer className="py-4 md:py-6 lg:py-8">
                  <p className="text-xs text-gray-500">&copy; 2020</p>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
