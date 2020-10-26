import React from "react";
import { Link, graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import cc from "classcat";
import slugify from "@sindresorhus/slugify";
import useDarkMode from "use-dark-mode";

import { useNavigationState } from "../context/navigation";
import Logo from "../components/Logo";

import "../styles/main.css";

const groups = {
  "docs/schema": "Schema",
  "docs/content-api": "Content API",
  "docs/develop": "Develop",
};

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
    <div className="min-h-screen">
      <main className="xl:container mx-auto">
        <div className="flex flex-wrap relative px-6 h-screen">
          <aside className="sidebar w-full md:w-1/5 xl:w-1/5 lg:block fixed lg:relative inset-0 lg:mt-0 hidden md:border-r md:border-primary-150 md:dark:border-primary-800">
            <div className="pt-8 pr-5 pl-2 relative z-20">
              <div className="w-full md:flex md:justify-between md:items-center mb-6">
                <Link to="/docs" className="text-primary-900 dark:text-white">
                  <Logo />
                </Link>
                <div className="hidden md:flex md:items-center">
                  <button
                    onClick={toggleDarkMode}
                    className="appearance-none p-1 text-primary-400 hover:text-primary-500 dark:text-primary-300 dark:hover:text-white focus:outline-none"
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

              <ul>
                <li className="-ml-2">
                  <Link
                    to="/docs"
                    className="py-1.5 px-2 flex items-center text-primary-500 bg-white border border-primary-100 rounded shadow-sm"
                  >
                    <span className="mr-2">
                      <svg
                        fill="currentColor"
                        width="17"
                        height="15"
                        viewBox="0 0 18 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 16.5V3C0 2.20435 0.316071 1.44129 0.87868 0.87868C1.44129 0.316071 2.20435 0 3 0H17C17.2652 0 17.5196 0.105357 17.7071 0.292893C17.8946 0.48043 18 0.734784 18 1V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H3.5C2.57174 20 1.6815 19.6313 1.02513 18.9749C0.368749 18.3185 0 17.4283 0 16.5ZM16 18V15H3.5C3.10218 15 2.72064 15.158 2.43934 15.4393C2.15804 15.7206 2 16.1022 2 16.5C2 16.8978 2.15804 17.2794 2.43934 17.5607C2.72064 17.842 3.10218 18 3.5 18H16ZM2 13.337C2.46869 13.1144 2.98115 12.9993 3.5 13H16V2H3C2.73478 2 2.48043 2.10536 2.29289 2.29289C2.10536 2.48043 2 2.73478 2 3V13.337Z" />
                      </svg>
                    </span>
                    Documentation
                  </Link>
                </li>
                <li className="-ml-2">
                  <Link
                    to="/integrations"
                    className="py-1.5 px-2 flex items-center text-gray-700 hover:text-primary-500 border border-r-0 border-transparent rounded-l"
                  >
                    <span className="mr-2">
                      <svg
                        fill="currentColor"
                        width="14"
                        height="20"
                        viewBox="0 0 17 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9 9H17L7 24V15H0L9 0V9ZM7 11V7.22L3.532 13H9V17.394L13.263 11H7Z" />
                      </svg>
                    </span>
                    Integrations
                  </Link>
                </li>
                <li className="-ml-2">
                  <Link
                    to="/quickstarts"
                    className="py-1.5 px-2 flex items-center text-gray-700 hover:text-primary-500 border border-r-0 border-transparent rounded-l"
                  >
                    <span className="mr-2">
                      <svg
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="17"
                        height="17"
                      >
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M5 13c0-5.088 2.903-9.436 7-11.182C16.097 3.564 19 7.912 19 13c0 .823-.076 1.626-.22 2.403l1.94 1.832a.5.5 0 0 1 .095.603l-2.495 4.575a.5.5 0 0 1-.793.114l-2.234-2.234a1 1 0 0 0-.707-.293H9.414a1 1 0 0 0-.707.293l-2.234 2.234a.5.5 0 0 1-.793-.114l-2.495-4.575a.5.5 0 0 1 .095-.603l1.94-1.832C5.077 14.626 5 13.823 5 13zm1.476 6.696l.817-.817A3 3 0 0 1 9.414 18h5.172a3 3 0 0 1 2.121.879l.817.817.982-1.8-1.1-1.04a2 2 0 0 1-.593-1.82c.124-.664.187-1.345.187-2.036 0-3.87-1.995-7.3-5-8.96C8.995 5.7 7 9.13 7 13c0 .691.063 1.372.187 2.037a2 2 0 0 1-.593 1.82l-1.1 1.039.982 1.8zM12 13a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                      </svg>
                    </span>
                    Quickstarts
                  </Link>
                </li>
              </ul>
            </div>

            <div className="lg:sticky lg:top-0 overflow-y-auto lg:h-auto z-20 max-h-screen">
              <div className="lg:py-8 pr-6">
                {sortedNavFiles.map(({ fieldValue, nodes }, index) => {
                  const isGroup = nodes.length > 1;

                  return (
                    <div key={index} className={cc([{ "pt-6": isGroup }])}>
                      {isGroup && (
                        <p className="pl-2 mb-2 text-primary-300 dark:text-primary-600 uppercase tracking-wider font-medium text-sm lg:text-xs">
                          {groups[fieldValue]}
                        </p>
                      )}

                      <ul>
                        {nodes.map(({ base, childMdx, id }) => {
                          if (isGroup && base === "index.mdx") return null;
                          const isActive =
                            childMdx?.fields?.slug === currentPath;

                          return (
                            <li key={id}>
                              <Link
                                to={childMdx?.fields?.slug}
                                className={cc([
                                  "py-1 px-2 block duration-100 ease-in-out transition-all rounded",
                                  {
                                    "text-white dark:text-white hover:text-white bg-primary-500": isActive,
                                  },
                                  {
                                    "text-gray-700 dark:text-primary-400 hover:text-primary-500 dark:hover:text-white": !isActive,
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
            <div className="lg:bg-white dark:bg-transparent w-full xl:w-3/4 py-4 md:py-8 xl:border-r xl:border-primary-150 xl:dark:border-primary-900">
              <div className="lg:px-8">
                <div className="max-w-none prose dark:prose-dark">
                  <h1 className="flex items-center justify-between">{title}</h1>
                  <MDXRenderer>{body}</MDXRenderer>
                </div>
              </div>
            </div>
            <div className="hidden xl:block xl:w-1/4 xl:py-4 xl:pt-8 xl:pb-4">
              <div className="flex items-space space-x-2 md:px-6">
                <a
                  href="https://github.com/graphcms"
                  className="text-primary-300 hover:text-primary-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476 0-.237-.013-1.024-.013-1.862-2.512.463-3.162-.612-3.362-1.175-.113-.288-.6-1.175-1.025-1.413-.35-.187-.85-.65-.013-.662.788-.013 1.35.725 1.538 1.025.9 1.512 2.338 1.087 2.912.825.088-.65.35-1.087.638-1.337-2.225-.25-4.55-1.113-4.55-4.938 0-1.088.387-1.987 1.025-2.688-.1-.25-.45-1.275.1-2.65 0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337 1.912-1.3 2.75-1.024 2.75-1.024.55 1.375.2 2.4.1 2.65.637.7 1.025 1.587 1.025 2.687 0 3.838-2.337 4.688-4.562 4.938.362.312.675.912.675 1.85 0 1.337-.013 2.412-.013 2.75 0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z" />
                  </svg>
                </a>
                <a
                  href="https://slack.graphcms.com"
                  className="text-primary-300 hover:text-primary-500"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M6.527 14.514A1.973 1.973 0 0 1 4.56 16.48a1.973 1.973 0 0 1-1.967-1.967c0-1.083.884-1.968 1.967-1.968h1.968v1.968zm.992 0c0-1.083.884-1.968 1.967-1.968 1.083 0 1.968.885 1.968 1.968v4.927a1.973 1.973 0 0 1-1.968 1.967 1.973 1.973 0 0 1-1.967-1.967v-4.927zm1.967-7.987A1.973 1.973 0 0 1 7.52 4.56c0-1.083.884-1.967 1.967-1.967 1.083 0 1.968.884 1.968 1.967v1.968H9.486zm0 .992c1.083 0 1.968.884 1.968 1.967a1.973 1.973 0 0 1-1.968 1.968H4.56a1.973 1.973 0 0 1-1.967-1.968c0-1.083.884-1.967 1.967-1.967h4.927zm7.987 1.967c0-1.083.885-1.967 1.968-1.967s1.967.884 1.967 1.967a1.973 1.973 0 0 1-1.967 1.968h-1.968V9.486zm-.992 0a1.973 1.973 0 0 1-1.967 1.968 1.973 1.973 0 0 1-1.968-1.968V4.56c0-1.083.885-1.967 1.968-1.967s1.967.884 1.967 1.967v4.927zm-1.967 7.987c1.083 0 1.967.885 1.967 1.968a1.973 1.973 0 0 1-1.967 1.967 1.973 1.973 0 0 1-1.968-1.967v-1.968h1.968zm0-.992a1.973 1.973 0 0 1-1.968-1.967c0-1.083.885-1.968 1.968-1.968h4.927c1.083 0 1.967.885 1.967 1.968a1.973 1.973 0 0 1-1.967 1.967h-4.927z" />
                  </svg>
                </a>
              </div>

              <div className="lg:px-6 lg:sticky lg:top-0 pt-8">
                {headings?.length > 0 && !disableTOC && (
                  <>
                    <p className="py-2 text-primary-300 dark:text-primary-600 uppercase tracking-wider font-medium text-sm lg:text-xs">
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
