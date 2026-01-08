"use client";

import React, { useEffect, useState } from "react";
import "@/app/styles/design-system.css";
import { TrophyIcon, LockClosedIcon, SparklesIcon } from "@heroicons/react/24/outline";

interface Badge {
  id: number;
  name: string;
  description: string;
  badge_type: string;
  icon_url: string;
  requirement_value: number;
  earned_at?: string;
}

interface UserProgress {
  modules_completed: number;
  quizzes_completed: number;
  current_streak: number;
}

export default function BadgesSidebar() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBadgesAndProgress();
  }, []);

  const fetchBadgesAndProgress = async () => {
    try {
      setLoading(true);

      // Fetch all badges
      const badgesRes = await fetch("/api/badges");
      if (!badgesRes.ok) throw new Error("Failed to fetch badges");
      const allBadges = await badgesRes.json();

      // Fetch user's earned badges
      const userBadgesRes = await fetch("/api/badges/user");
      const userBadges = userBadgesRes.ok ? await userBadgesRes.json() : [];

      // Merge data - mark which badges are earned
      const earnedBadgeIds = new Set(userBadges.map((ub: any) => ub.badge_id));
      const mergedBadges = allBadges.map((badge: Badge) => ({
        ...badge,
        earned_at: userBadges.find((ub: any) => ub.badge_id === badge.id)?.earned_at,
      }));

      setBadges(mergedBadges);

      // Fetch user progress (for next badge calculation)
      const progressRes = await fetch("/api/profile/progress");
      if (progressRes.ok) {
        const progress = await progressRes.json();
        setUserProgress(progress);
      }

      setError(null);
    } catch (err) {
      console.error("Error fetching badges:", err);
      setError("Failed to load badges");
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (badge: Badge): number => {
    if (!userProgress) return 0;

    switch (badge.badge_type) {
      case "module_completion":
        return Math.min(
          (userProgress.modules_completed / badge.requirement_value) * 100,
          100
        );
      case "quiz_completion":
        return Math.min(
          (userProgress.quizzes_completed / badge.requirement_value) * 100,
          100
        );
      case "streak":
        return Math.min(
          (userProgress.current_streak / badge.requirement_value) * 100,
          100
        );
      default:
        return 0;
    }
  };

  const getNextBadge = (): Badge | null => {
    const unearned = badges.filter((b) => !b.earned_at);
    if (unearned.length === 0) return null;

    // Find the badge closest to being earned
    return unearned.reduce((closest, badge) => {
      const progress = calculateProgress(badge);
      const closestProgress = calculateProgress(closest);
      return progress > closestProgress ? badge : closest;
    });
  };

  const earnedBadges = badges.filter((b) => b.earned_at);
  const lockedBadges = badges.filter((b) => !b.earned_at);
  const nextBadge = getNextBadge();

  if (loading) {
    return (
      <div
        className="ds-card"
        style={{
          position: "sticky",
          top: "var(--space-xl)",
          minHeight: "400px",
        }}
      >
        <div className="ds-card-body" style={{ textAlign: "center" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              border: "3px solid var(--accent-purple)",
              borderTopColor: "transparent",
              borderRadius: "50%",
              margin: "var(--space-xl) auto",
              animation: "spin 1s linear infinite",
            }}
          />
          <p className="ds-body-small" style={{ color: "var(--text-tertiary)" }}>
            Loading badges...
          </p>
        </div>
        <style jsx>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="ds-card"
        style={{ position: "sticky", top: "var(--space-xl)" }}
      >
        <div className="ds-card-body" style={{ textAlign: "center" }}>
          <p className="ds-body-small" style={{ color: "var(--color-error)" }}>
            {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="ds-card"
      style={{
        position: "sticky",
        top: "var(--space-xl)",
        maxHeight: "calc(100vh - var(--space-3xl))",
        overflowY: "auto",
      }}
    >
      {/* Header */}
      <div className="ds-card-header">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--space-sm)",
          }}
        >
          <TrophyIcon style={{ width: "24px", height: "24px", color: "var(--accent-purple)" }} />
          <h3 className="ds-heading-4">Your Badges</h3>
        </div>
        <p className="ds-body-small" style={{ marginTop: "var(--space-xs)", color: "var(--text-tertiary)" }}>
          {earnedBadges.length} of {badges.length} earned
        </p>
      </div>

      <div className="ds-card-body">
        {/* Next Badge Progress */}
        {nextBadge && (
          <div
            style={{
              padding: "var(--space-md)",
              backgroundColor: "rgba(153, 85, 235, 0.05)",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--accent-purple)",
              marginBottom: "var(--space-lg)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "var(--space-sm)",
                marginBottom: "var(--space-sm)",
              }}
            >
              <SparklesIcon style={{ width: "16px", height: "16px", color: "var(--accent-purple)" }} />
              <span className="ds-body-small" style={{ fontWeight: "var(--font-semibold)" }}>
                Next Badge
              </span>
            </div>
            <p className="ds-body-small" style={{ marginBottom: "var(--space-sm)" }}>
              {nextBadge.name}
            </p>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "var(--border-default)",
                borderRadius: "var(--radius-full)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${calculateProgress(nextBadge)}%`,
                  height: "100%",
                  backgroundColor: "var(--accent-purple)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <p
              className="ds-body-small"
              style={{
                marginTop: "var(--space-xs)",
                color: "var(--text-tertiary)",
                fontSize: "var(--text-xs)",
              }}
            >
              {Math.round(calculateProgress(nextBadge))}% complete
            </p>
          </div>
        )}

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div style={{ marginBottom: "var(--space-lg)" }}>
            <h4
              className="ds-heading-4"
              style={{
                fontSize: "var(--text-sm)",
                marginBottom: "var(--space-md)",
                color: "var(--text-secondary)",
              }}
            >
              Earned ({earnedBadges.length})
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--space-md)",
              }}
            >
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    padding: "var(--space-sm)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "all var(--transition-fast)",
                  }}
                  className="badge-item"
                  title={`${badge.name}: ${badge.description}`}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "rgba(200, 229, 36, 0.1)",
                      border: "2px solid var(--accent-lime)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                    }}
                  >
                    🏆
                  </div>
                  <span
                    className="ds-body-small"
                    style={{
                      fontSize: "var(--text-xs)",
                      textAlign: "center",
                      lineHeight: "var(--leading-tight)",
                    }}
                  >
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Locked Badges */}
        {lockedBadges.length > 0 && (
          <div>
            <h4
              className="ds-heading-4"
              style={{
                fontSize: "var(--text-sm)",
                marginBottom: "var(--space-md)",
                color: "var(--text-secondary)",
              }}
            >
              Locked ({lockedBadges.length})
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "var(--space-md)",
              }}
            >
              {lockedBadges.map((badge) => (
                <div
                  key={badge.id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "var(--space-xs)",
                    padding: "var(--space-sm)",
                    borderRadius: "var(--radius-md)",
                    opacity: 0.4,
                    cursor: "help",
                  }}
                  title={`${badge.name}: ${badge.description}`}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: "var(--bg-card-hover)",
                      border: "2px solid var(--border-default)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <LockClosedIcon style={{ width: "24px", height: "24px", color: "var(--text-disabled)" }} />
                  </div>
                  <span
                    className="ds-body-small"
                    style={{
                      fontSize: "var(--text-xs)",
                      textAlign: "center",
                      lineHeight: "var(--leading-tight)",
                      color: "var(--text-disabled)",
                    }}
                  >
                    {badge.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {badges.length === 0 && (
          <div style={{ textAlign: "center", padding: "var(--space-xl)" }}>
            <TrophyIcon
              style={{
                width: "48px",
                height: "48px",
                color: "var(--text-disabled)",
                margin: "0 auto var(--space-md)",
              }}
            />
            <p className="ds-body-small" style={{ color: "var(--text-tertiary)" }}>
              No badges available yet
            </p>
          </div>
        )}
      </div>

      <style jsx>{`
        .badge-item:hover {
          background-color: var(--bg-card-hover);
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
