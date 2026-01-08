"use client";

import React from "react";
import "@/app/styles/design-system.css";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface ModuleFiltersProps {
  selectedTopic: string;
  selectedDifficulty: string;
  sortBy: string;
  searchQuery: string;
  onTopicChange: (topic: string) => void;
  onDifficultyChange: (difficulty: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (query: string) => void;
}

const TOPICS = [
  { value: "all", label: "All Topics" },
  { value: "scholarship_scams", label: "Scholarship Scams" },
  { value: "fake_products", label: "Fake Products" },
  { value: "phishing", label: "Phishing & Account Takeovers" },
  { value: "investment_scams", label: "Investment Scams" },
  { value: "job_scams", label: "Job Offer Scams" },
  { value: "giveaway_scams", label: "Prize & Giveaway Scams" },
  { value: "impersonation", label: "Impersonation Scams" },
  { value: "crypto_scams", label: "Crypto & NFT Scams" },
];

const DIFFICULTIES = [
  { value: "all", label: "All Difficulties" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "difficulty-asc", label: "Difficulty: Easy → Hard" },
  { value: "difficulty-desc", label: "Difficulty: Hard → Easy" },
  { value: "popular", label: "Most Popular" },
];

export default function ModuleFilters({
  selectedTopic,
  selectedDifficulty,
  sortBy,
  searchQuery,
  onTopicChange,
  onDifficultyChange,
  onSortChange,
  onSearchChange,
}: ModuleFiltersProps) {
  return (
    <div className="ds-card" style={{ marginBottom: "var(--space-xl)" }}>
      <div className="ds-card-body">
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
            marginBottom: "var(--space-lg)",
          }}
        >
          <FunnelIcon
            style={{
              width: "20px",
              height: "20px",
              color: "var(--accent-purple)",
            }}
          />
          <h3 className="ds-heading-4">Filter & Sort</h3>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: "var(--space-lg)" }}>
          <label className="ds-label" htmlFor="module-search">
            Search Modules
          </label>
          <div style={{ position: "relative" }}>
            <MagnifyingGlassIcon
              style={{
                position: "absolute",
                left: "var(--space-md)",
                top: "50%",
                transform: "translateY(-50%)",
                width: "20px",
                height: "20px",
                color: "var(--text-tertiary)",
                pointerEvents: "none",
              }}
            />
            <input
              id="module-search"
              type="text"
              className="ds-input"
              placeholder="Search by title or description..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                paddingLeft: "calc(var(--space-md) + 28px)",
              }}
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "var(--space-lg)",
          }}
        >
          {/* Topic Filter */}
          <div className="ds-form-group" style={{ marginBottom: 0 }}>
            <label className="ds-label" htmlFor="topic-filter">
              Topic
            </label>
            <select
              id="topic-filter"
              className="ds-input ds-select"
              value={selectedTopic}
              onChange={(e) => onTopicChange(e.target.value)}
            >
              {TOPICS.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="ds-form-group" style={{ marginBottom: 0 }}>
            <label className="ds-label" htmlFor="difficulty-filter">
              Difficulty
            </label>
            <select
              id="difficulty-filter"
              className="ds-input ds-select"
              value={selectedDifficulty}
              onChange={(e) => onDifficultyChange(e.target.value)}
            >
              {DIFFICULTIES.map((difficulty) => (
                <option key={difficulty.value} value={difficulty.value}>
                  {difficulty.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="ds-form-group" style={{ marginBottom: 0 }}>
            <label className="ds-label" htmlFor="sort-by">
              Sort By
            </label>
            <select
              id="sort-by"
              className="ds-input ds-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedTopic !== "all" ||
          selectedDifficulty !== "all" ||
          searchQuery) && (
          <div
            style={{
              marginTop: "var(--space-lg)",
              paddingTop: "var(--space-lg)",
              borderTop: "1px solid var(--border-default)",
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--space-sm)",
              alignItems: "center",
            }}
          >
            <span className="ds-body-small" style={{ color: "var(--text-tertiary)" }}>
              Active filters:
            </span>

            {selectedTopic !== "all" && (
              <span className="ds-badge ds-badge-purple">
                {TOPICS.find((t) => t.value === selectedTopic)?.label}
              </span>
            )}

            {selectedDifficulty !== "all" && (
              <span
                className={`ds-badge ${
                  selectedDifficulty === "easy"
                    ? "ds-badge-lime"
                    : selectedDifficulty === "medium"
                    ? "ds-badge-purple"
                    : "ds-badge-blue"
                }`}
              >
                {DIFFICULTIES.find((d) => d.value === selectedDifficulty)?.label}
              </span>
            )}

            {searchQuery && (
              <span className="ds-badge ds-badge-blue">
                Search: &quot;{searchQuery}&quot;
              </span>
            )}

            <button
              className="ds-btn ds-btn-ghost ds-btn-sm"
              onClick={() => {
                onTopicChange("all");
                onDifficultyChange("all");
                onSearchChange("");
              }}
              style={{ marginLeft: "auto" }}
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
