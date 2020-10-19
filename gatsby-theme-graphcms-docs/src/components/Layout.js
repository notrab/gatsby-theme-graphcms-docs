import React from "react";
import { graphql, useStaticQuery, Link } from "gatsby";

const GetGroupsAndPages = graphql`
  {
    allFile(
      filter: { extension: { in: ["md", "mdx"] } }
      sort: { fields: childMdx___frontmatter___position }
    ) {
      group(field: childMdx___frontmatter___category) {
        title: fieldValue
        totalCount
        nodes {
          id
          childMdx {
            fields {
              slug
            }
            frontmatter {
              title
              disableTOC
            }
          }
        }
      }
    }
  }
`;

export default function Layout({ children }) {
  const data = useStaticQuery(GetGroupsAndPages);

  return (
    <div>
      <nav>
        {data.allFile.group.map(({ id, title, nodes }) => (
          <div key={id}>
            <h4>{title}</h4>

            <ul>
              {nodes.map(({ childMdx, id }) => (
                <li key={id}>
                  <Link to={`/${childMdx.fields.slug}`}>
                    {childMdx.frontmatter.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
      <main>{children}</main>
    </div>
  );
}
