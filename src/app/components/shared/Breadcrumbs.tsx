"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumbs() {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    // Remove leading slash and split path
    const pathSegments = pathname.split("/").filter((segment) => segment);

    if (pathSegments.length === 0) {
      return [];
    }

    const breadcrumbs: BreadcrumbItem[] = [];
    let currentPath = "";

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Format segment label (convert kebab-case to Title Case)
      let label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Special formatting for specific routes
      if (segment === "learning-modules") label = "Learning Modules";
      if (segment === "latest-news") label = "Latest News";
      if (segment === "camera-detection") label = "Camera Detection";

      // Skip adding breadcrumb for dynamic route IDs (numeric or UUID)
      const isId = /^[0-9]+$/.test(segment) || /^[a-f0-9-]{36}$/.test(segment);

      if (!isId) {
        breadcrumbs.push({
          label,
          href: currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on home page or landing page
  if (pathname === "/" || pathname === "/home") {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="ds-container"
      style={{
        paddingTop: "var(--space-lg)",
        paddingBottom: "var(--space-md)",
      }}
    >
      <ol
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          listStyle: "none",
          padding: 0,
          margin: 0,
          flexWrap: "wrap",
        }}
      >
        {/* Home Link */}
        <li style={{ display: "flex", alignItems: "center" }}>
          <Link
            href="/home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-xs)",
              color: "var(--text-tertiary)",
              textDecoration: "none",
              fontSize: "var(--text-sm)",
              transition: "color var(--transition-fast)",
              padding: "var(--space-xs) var(--space-sm)",
              borderRadius: "var(--radius-sm)",
            }}
            className="breadcrumb-link"
          >
            <HomeIcon style={{ width: "1rem", height: "1rem" }} />
            <span>Home</span>
          </Link>
        </li>

        {/* Breadcrumb Items */}
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <React.Fragment key={crumb.href}>
              {/* Separator */}
              <li style={{ display: "flex", alignItems: "center" }}>
                <ChevronRightIcon
                  style={{
                    width: "1rem",
                    height: "1rem",
                    color: "var(--text-disabled)",
                  }}
                />
              </li>

              {/* Breadcrumb Link */}
              <li style={{ display: "flex", alignItems: "center" }}>
                {isLast ? (
                  <span
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "var(--text-sm)",
                      fontWeight: "var(--font-medium)",
                      padding: "var(--space-xs) var(--space-sm)",
                    }}
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    style={{
                      color: "var(--text-tertiary)",
                      textDecoration: "none",
                      fontSize: "var(--text-sm)",
                      transition: "color var(--transition-fast)",
                      padding: "var(--space-xs) var(--space-sm)",
                      borderRadius: "var(--radius-sm)",
                    }}
                    className="breadcrumb-link"
                  >
                    {crumb.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>

      <style jsx>{`
        .breadcrumb-link:hover {
          color: var(--accent-purple);
          background-color: var(--bg-card-hover);
        }
      `}</style>
    </nav>
  );
}
