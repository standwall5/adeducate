"use client";

import React, { useEffect, useState } from "react";
import "@/app/styles/design-system.css";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import BadgesSidebar from "./components/BadgesSidebar";
import ModuleFilters from "./components/ModuleFilters";
import Link from "next/link";
import { ClockIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

interface Module {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  estimated_minutes: number;
  thumbnail_url?: string;
  is_recommended?: boolean;
}

export default function ModulesPage() {
  const [modules, setModules] = useState<Module[]>([]);
  const [filteredModules, setFilteredModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [selectedTopic, setSelectedTopic] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchModules();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [modules, selectedTopic, selectedDifficulty, sortBy, searchQuery]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/getModules");
      if (!res.ok) throw new Error("Failed to fetch modules");
      const data = await res.json();
      setModules(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching modules:", err);
      setError("Failed to load modules. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...modules];

    // Apply topic filter
    if (selectedTopic !== "all") {
      filtered = filtered.filter((m) => m.topic === selectedTopic);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter((m) => m.difficulty === selectedDifficulty);
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(query) ||
          m.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.id - a.id;
        case "oldest":
          return a.id - b.id;
        case "difficulty-asc":
          const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "difficulty-desc":
          const difficultyOrderDesc = { easy: 1, medium: 2, hard: 3 };
          return difficultyOrderDesc[b.difficulty] - difficultyOrderDesc[a.difficulty];
        case "popular":
          // In future, sort by completion count or views
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredModules(filtered);
  };

  const getDifficultyBadgeClass = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "ds-badge ds-badge-lime";
      case "medium":
        return "ds-badge ds-badge-purple";
      case "hard":
        return "ds-badge ds-badge-blue";
      default:
        return "ds-badge";
    }
  };

  const getTopicLabel = (topic: string) => {
    const topicMap: { [key: string]: string } = {
      scholarship_scams: "Scholarship Scams",
      fake_products: "Fake Products",
      phishing: "Phishing",
      investment_scams: "Investment Scams",
      job_scams: "Job Scams",
      giveaway_scams: "Giveaway Scams",
      impersonation: "Impersonation",
      crypto_scams: "Crypto Scams",
    };
    return topicMap[topic] || topic;
  };

  return (
    <>
      <Breadcrumbs />
      <div className="ds-container" style={{ paddingBottom: "var(--space-4xl)" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "280px 1fr",
            gap: "var(--space-xl)",
            alignItems: "start",
          }}
          className="modules-layout"
        >
          {/* Left Sidebar - Badges */}
          <aside className="badges-sidebar">
            <BadgesSidebar />
          </aside>

          {/* Main Content */}
          <main>
            {/* Page Header */}
            <div style={{ marginBottom: "var(--space-xl)" }}>
              <h1 className="ds-heading-1" style={{ marginBottom: "var(--space-sm)" }}>
                Learning Modules
              </h1>
              <p className="ds-body-large" style={{ color: "var(--text-secondary)" }}>
                Master the skills to identify fake social media advertisements and online scams
              </p>
            </div>

            {/* Filters */}
            <ModuleFilters
              selectedTopic={selectedTopic}
              selectedDifficulty={selectedDifficulty}
              sortBy={sortBy}
              searchQuery={searchQuery}
              onTopicChange={setSelectedTopic}
              onDifficultyChange={setSelectedDifficulty}
              onSortChange={setSortBy}
              onSearchChange={setSearchQuery}
            />

            {/* Loading State */}
            {loading && (
              <div className="ds-card">
                <div className="ds-card-body" style={{ textAlign: "center", padding: "var(--space-3xl)" }}>
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      border: "4px solid var(--accent-purple)",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      margin: "0 auto var(--space-lg)",
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  <p className="ds-body">Loading modules...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="ds-card" style={{ borderColor: "var(--color-error)" }}>
                <div className="ds-card-body" style={{ textAlign: "center", padding: "var(--space-3xl)" }}>
                  <p className="ds-body" style={{ color: "var(--color-error)", marginBottom: "var(--space-lg)" }}>
                    {error}
                  </p>
                  <button className="ds-btn ds-btn-primary" onClick={fetchModules}>
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Modules Grid */}
            {!loading && !error && (
              <>
                {/* Results Count */}
                <div style={{ marginBottom: "var(--space-lg)" }}>
                  <p className="ds-body-small" style={{ color: "var(--text-tertiary)" }}>
                    Showing {filteredModules.length} {filteredModules.length === 1 ? "module" : "modules"}
                  </p>
                </div>

                {/* Grid */}
                {filteredModules.length > 0 ? (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                      gap: "var(--space-xl)",
                    }}
                  >
                    {filteredModules.map((module) => (
                      <Link
                        key={module.id}
                        href={`/learning-modules/${module.id}`}
                        className="ds-card ds-card-interactive ds-card-accent-purple"
                        style={{ textDecoration: "none", display: "flex", flexDirection: "column" }}
                      >
                        <div className="ds-card-body" style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                          {/* Header */}
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                              marginBottom: "var(--space-md)",
                            }}
                          >
                            <span className={getDifficultyBadgeClass(module.difficulty)}>
                              {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                            </span>
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-xs)" }}>
                              <ClockIcon style={{ width: "14px", height: "14px", color: "var(--text-tertiary)" }} />
                              <span className="ds-body-small" style={{ color: "var(--text-tertiary)", fontSize: "var(--text-xs)" }}>
                                {module.estimated_minutes} min
                              </span>
                            </div>
                          </div>

                          {/* Topic */}
                          <span
                            className="ds-body-small"
                            style={{
                              color: "var(--accent-purple)",
                              fontSize: "var(--text-xs)",
                              fontWeight: "var(--font-medium)",
                              marginBottom: "var(--space-sm)",
                            }}
                          >
                            {getTopicLabel(module.topic)}
                          </span>

                          {/* Title */}
                          <h3 className="ds-heading-4" style={{ marginBottom: "var(--space-sm)" }}>
                            {module.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="ds-body-small"
                            style={{
                              color: "var(--text-secondary)",
                              flex: 1,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              marginBottom: "var(--space-md)",
                            }}
                          >
                            {module.description}
                          </p>

                          {/* Footer */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "var(--space-xs)",
                              paddingTop: "var(--space-md)",
                              borderTop: "1px solid var(--border-default)",
                            }}
                          >
                            <AcademicCapIcon style={{ width: "16px", height: "16px", color: "var(--accent-purple)" }} />
                            <span className="ds-body-small" style={{ color: "var(--accent-purple)", fontWeight: "var(--font-medium)" }}>
                              Start Learning
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  // Empty State
                  <div className="ds-card">
                    <div className="ds-card-body" style={{ textAlign: "center", padding: "var(--space-3xl)" }}>
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          borderRadius: "var(--radius-full)",
                          backgroundColor: "var(--bg-card-hover)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "0 auto var(--space-lg)",
                        }}
                      >
                        <AcademicCapIcon style={{ width: "32px", height: "32px", color: "var(--text-disabled)" }} />
                      </div>
                      <h3 className="ds-heading-3" style={{ marginBottom: "var(--space-sm)" }}>
                        No modules found
                      </h3>
                      <p className="ds-body" style={{ color: "var(--text-secondary)", marginBottom: "var(--space-lg)" }}>
                        Try adjusting your filters or search query
                      </p>
                      <button
                        className="ds-btn ds-btn-secondary"
                        onClick={() => {
                          setSelectedTopic("all");
                          setSelectedDifficulty("all");
                          setSearchQuery("");
                        }}
                      >
                        Clear Filters
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1024px) {
          .modules-layout {
            grid-template-columns: 1fr !important;
          }

          .badges-sidebar {
            position: static !important;
          }
        }
      `}</style>
    </>
  );
}
