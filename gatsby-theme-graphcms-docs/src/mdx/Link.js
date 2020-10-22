import React from "react";
import { Link as InternalLink } from "gatsby";

export default function Link({ href, children, ...props }) {
  if (!href) return null;

  const stripTrailingSlash = (href) => {
    if (href === "/") return href;

    return href.endsWith("/") ? href.slice(0, -1) : href;
  };

  const anchorLink = href.startsWith("#");

  if (href.includes("http") || href.includes("mailto") || anchorLink) {
    return (
      <a
        href={stripTrailingSlash(href)}
        target={anchorLink ? null : "_blank"}
        rel={anchorLink ? null : "noopener noreferrer"}
        {...props}
      >
        {children}
      </a>
    );
  } else {
    return (
      <InternalLink to={`/docs${stripTrailingSlash(href)}`} {...props}>
        {children}
      </InternalLink>
    );
  }
}
