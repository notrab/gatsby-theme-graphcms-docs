import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import cc from "classcat";
import slugify from "@sindresorhus/slugify";
import useDarkMode from "use-dark-mode";

import { useNavigationState } from "../context/navigation";
import Logo from "../components/Logo";

import "../styles/main.css";

export default function DocPage({ pageContext: { node }, data: { navFiles } }) {
  const { currentPath } = useNavigationState();
  const { frontmatter, body, headings } = node.childMdx;
  const { title, disableTOC } = frontmatter;
  const { value: darkModeValue, toggle: toggleDarkMode } = useDarkMode(false, {
    classNameDark: "dark",
  });

  const sortedNavFiles = [...navFiles.group].sort(
    (a, b) =>
      a.nodes.find((node) => node.base === "index.mdx")?.childMdx?.frontmatter
        ?.position -
      b.nodes.find((node) => node.base === "index.mdx")?.childMdx?.frontmatter
        ?.position
  );

  return (
    <div className="pt-16 min-h-screen">
      <header className="fixed top-0 z-40 w-full bg-white dark:bg-primary-900 shadow-sm border-b border-primary-200 lg:dark:border-primary-700">
        <div className="container mx-auto h-16 px-6 flex items-center space-x-6">
          <div className="w-full md:w-1/5 md:border-r md:border-primary-100 lg:dark:border-primary-700 md:flex md:justify-between md:items-center md:pr-3">
            <Link to="/docs" className="text-primary-900 dark:text-white">
              <Logo />
            </Link>
            <div className="hidden md:block">
              <button
                onClick={toggleDarkMode}
                className="appearance-none p-1 text-primary-900 dark:text-white focus:outline-none"
              >
                {darkModeValue ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-current w-4 h-4"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85l1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="fill-current w-4 h-4"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="md:w-2/5">
            <ul className="space-x-1 md:space-x-3 flex items-center">
              <li>
                <Link
                  to="/docs"
                  className="px-3 py-2 text-gray-700 dark:text-gray-300"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  to="/integrations"
                  className="px-3 py-2 text-gray-700 dark:text-gray-300"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  to="/quickstarts"
                  className="px-3 py-2 text-gray-700 dark:text-gray-300"
                  // className="px-3 py-2 text-primary-500 dark:text-white font-medium rounded bg-primary-100 lg:dark:bg-primary-800"
                >
                  Quickstarts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main className="container mx-auto">
        <div
          className="flex flex-wrap relative px-6"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <aside className="w-full md:w-1/5 xl:w-1/5 lg:block fixed lg:relative inset-0 mt-16 lg:mt-0 hidden md:border-r md:border-primary-100 lg:dark:border-primary-700">
            <div
              className="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto z-20"
              style={{ height: "calc(100vh - 4rem)" }}
            >
              <div className="lg:py-8 pr-6">
                {sortedNavFiles.map(({ fieldValue, nodes }, index) => {
                  const isGroup = nodes.length > 1;

                  return (
                    <div key={index} className={cc([{ "pt-4": isGroup }])}>
                      {isGroup && (
                        <p className="mb-2 text-gray-400 dark:text-primary-600 uppercase tracking-wider font-medium text-sm lg:text-xs">
                          {fieldValue}
                        </p>
                      )}

                      <ul>
                        {nodes.map(({ base, childMdx, id }) => {
                          if (isGroup && base === "index.mdx") return null;

                          return (
                            <li
                              key={id}
                              className="text-gray-700 dark:text-primary-400"
                            >
                              <Link
                                to={childMdx?.fields?.slug}
                                className={cc([
                                  "py-1 px-2 hover:text-primary-500 dark:hover:text-white block",
                                  {
                                    "text-primary-500 dark:text-white hover:text-primary-500 rounded bg-primary-100 dark:bg-primary-700 dark:hover:text-white":
                                      childMdx?.fields?.slug === currentPath,
                                  },
                                ])}
                              >
                                {childMdx?.frontmatter?.title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
          <div className="flex flex-wrap w-full lg:w-4/5">
            <div className="lg:bg-white dark:bg-transparent w-full xl:w-3/4 py-4 md:pt-8 md:pb-4 lg:border-r lg:border-primary-100 lg:dark:border-primary-700">
              <div className="lg:px-8">
                <div className="max-w-none prose">
                  <h1 className="flex items-center justify-between">{title}</h1>
                  <MDXRenderer>{body}</MDXRenderer>
                </div>
              </div>
            </div>
            <div className="hidden xl:block xl:w-1/4 xl:py-4 xl:pt-8 xl:pb-4">
              <div className="lg:px-8 lg:sticky lg:top-16 pt-8">
                {headings?.length > 0 && !disableTOC && (
                  <>
                    <p className="py-2 text-gray-400 dark:text-primary-600 uppercase tracking-wider font-medium text-sm lg:text-xs">
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
                                "text-gray-700 dark:text-primary-400 hover:text-primary-500 dark:hover:text-white text-sm block",
                                {
                                  "py-1": depth === 2,
                                },
                                {
                                  "pl-2 pt-1": depth === 3,
                                },
                                {
                                  "pl-4 pt-1": depth === 4,
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
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const pageQuery = graphql`
  query DocPageQuery($relativeDirectory: String) {
    navFiles: allFile(
      filter: {
        extension: { in: ["md", "mdx"] }
        childMdx: { frontmatter: { hidden: { ne: true } } }
        relativeDirectory: { regex: $relativeDirectory }
      }
      sort: { fields: childMdx___frontmatter___position, order: ASC }
    ) {
      group(field: relativeDirectory) {
        fieldValue
        nodes {
          id
          base
          childMdx {
            fields {
              slug
            }
            frontmatter {
              title
              position
            }
          }
        }
      }
    }
  }
`;
