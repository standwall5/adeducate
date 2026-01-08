"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "@/app/styles/design-system.css";
import {
  BookOpenIcon,
  AcademicCapIcon,
  NewspaperIcon,
  QuestionMarkCircleIcon,
  FireIcon,
  SparklesIcon
} from "@heroicons/react/24/outline";

interface Module {
  id: number;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  topic: string;
  estimated_minutes: number;
  thumbnail_url: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  module_id: number;
}

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  published_at: string;
  source: string;
  thumbnail: string;
}

export default function HomePageRedesigned() {
  const [recommendedModules, setRecommendedModules] = useState<Module[]>([]);
  const [recommendedQuizzes, setRecommendedQuizzes] = useState<Quiz[]>([]);
  const [importantNews, setImportantNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recommended content
    const fetchRecommendations = async () => {
      try {
        // Fetch recommended modules
        const modulesRes = await fetch("/api/getModules?recommended=true&limit=3");
        const modulesData = await modulesRes.json();
        setRecommendedModules(modulesData);

        // Fetch recommended quizzes
        const quizzesRes = await fetch("/api/getQuizzes?recommended=true&limit=3");
        const quizzesData = await quizzesRes.json();
        setRecommendedQuizzes(quizzesData);

        // Fetch important news
        const newsRes = await fetch("/api/getNews?featured=true&limit=2");
        const newsData = await newsRes.json();
        setImportantNews(newsData);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

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

  return (
    <div className="ds-container" style={{ paddingTop: "var(--space-2xl)" }}>
      {/* Hero Section */}
      <section style={{ marginBottom: "var(--space-4xl)" }}>
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
          <h1 className="ds-heading-1" style={{ marginBottom: "var(--space-md)" }}>
            Learn to Spot Scams
          </h1>
          <p className="ds-body-large" style={{ color: "var(--text-secondary)" }}>
            Master the skills to identify fraudulent social media advertisements
            and protect yourself and your community from online scams.
          </p>
        </div>
      </section>

      {/* Main Navigation Cards */}
      <section style={{ marginBottom: "var(--space-4xl)" }}>
        <div className="ds-grid" style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "var(--space-xl)"
        }}>
          {/* Learning Materials Card */}
          <Link
            href="/learning-modules"
            className="ds-card ds-card-interactive ds-card-accent-lime"
            style={{ textDecoration: "none" }}
          >
            <div className="ds-card-body" style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-lg)"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "rgba(200, 229, 36, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <BookOpenIcon style={{ width: "28px", height: "28px", color: "var(--accent-lime-dark)" }} />
              </div>
              <div>
                <h2 className="ds-heading-3" style={{ marginBottom: "var(--space-sm)" }}>
                  Learning Materials
                </h2>
                <p className="ds-body-small" style={{ color: "var(--text-secondary)" }}>
                  Interactive modules designed to teach you how to identify fake social
                  media ads and online scams.
                </p>
              </div>
            </div>
          </Link>

          {/* Quizzes Card */}
          <Link
            href="/quizzes"
            className="ds-card ds-card-interactive ds-card-accent-purple"
            style={{ textDecoration: "none" }}
          >
            <div className="ds-card-body" style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-lg)"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "rgba(153, 85, 235, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <AcademicCapIcon style={{ width: "28px", height: "28px", color: "var(--accent-purple)" }} />
              </div>
              <div>
                <h2 className="ds-heading-3" style={{ marginBottom: "var(--space-sm)" }}>
                  Quizzes
                </h2>
                <p className="ds-body-small" style={{ color: "var(--text-secondary)" }}>
                  Test your knowledge and reinforce what you've learned with interactive
                  quizzes and pin games.
                </p>
              </div>
            </div>
          </Link>

          {/* Latest News Card */}
          <Link
            href="/latest-news"
            className="ds-card ds-card-interactive ds-card-accent-blue"
            style={{ textDecoration: "none" }}
          >
            <div className="ds-card-body" style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-lg)"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "rgba(131, 165, 240, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <NewspaperIcon style={{ width: "28px", height: "28px", color: "var(--accent-blue)" }} />
              </div>
              <div>
                <h2 className="ds-heading-3" style={{ marginBottom: "var(--space-sm)" }}>
                  Latest News
                </h2>
                <p className="ds-body-small" style={{ color: "var(--text-secondary)" }}>
                  Stay informed about recent scams and online fraud alerts in the Philippines.
                </p>
              </div>
            </div>
          </Link>

          {/* Support Card */}
          <Link
            href="/support"
            className="ds-card ds-card-interactive"
            style={{ textDecoration: "none" }}
          >
            <div className="ds-card-body" style={{
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-lg)"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "rgba(160, 160, 160, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <QuestionMarkCircleIcon style={{ width: "28px", height: "28px", color: "var(--text-secondary)" }} />
              </div>
              <div>
                <h2 className="ds-heading-3" style={{ marginBottom: "var(--space-sm)" }}>
                  Support
                </h2>
                <p className="ds-body-small" style={{ color: "var(--text-secondary)" }}>
                  Get help, access resources, and learn where to report suspicious activities.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Recommended Content Section */}
      <section style={{ marginBottom: "var(--space-4xl)" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-xl)"
        }}>
          <SparklesIcon style={{ width: "24px", height: "24px", color: "var(--accent-purple)" }} />
          <h2 className="ds-heading-2">Recommended For You</h2>
        </div>

        <div className="ds-grid" style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "var(--space-xl)"
        }}>
          {/* Recommended Modules */}
          {loading ? (
            <div className="ds-card">
              <div className="ds-card-body">
                <p className="ds-body-small" style={{ color: "var(--text-tertiary)" }}>
                  Loading recommendations...
                </p>
              </div>
            </div>
          ) : (
            recommendedModules.map((module) => (
              <Link
                key={module.id}
                href={`/learning-modules/${module.id}`}
                className="ds-card ds-card-compact ds-card-interactive"
                style={{ textDecoration: "none" }}
              >
                <div className="ds-card-body">
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "var(--space-md)"
                  }}>
                    <span className={getDifficultyBadgeClass(module.difficulty)}>
                      {module.difficulty.charAt(0).toUpperCase() + module.difficulty.slice(1)}
                    </span>
                    <span className="ds-body-small" style={{ color: "var(--text-tertiary)" }}>
                      {module.estimated_minutes} min
                    </span>
                  </div>
                  <h3 className="ds-heading-4" style={{ marginBottom: "var(--space-sm)" }}>
                    {module.title}
                  </h3>
                  <p className="ds-body-small" style={{
                    color: "var(--text-secondary)",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {module.description}
                  </p>
                </div>
              </Link>
            ))
          )}

          {/* Recommended Quizzes */}
          {!loading && recommendedQuizzes.map((quiz) => (
            <Link
              key={quiz.id}
              href={`/quizzes/${quiz.id}`}
              className="ds-card ds-card-compact ds-card-interactive ds-card-accent-purple"
              style={{ textDecoration: "none" }}
            >
              <div className="ds-card-body">
                <div style={{ marginBottom: "var(--space-md)" }}>
                  <span className="ds-badge ds-badge-purple">Quiz</span>
                </div>
                <h3 className="ds-heading-4" style={{ marginBottom: "var(--space-sm)" }}>
                  {quiz.title}
                </h3>
                <p className="ds-body-small" style={{
                  color: "var(--text-secondary)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {quiz.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Important News Section */}
      <section style={{ marginBottom: "var(--space-4xl)" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-sm)",
          marginBottom: "var(--space-xl)"
        }}>
          <FireIcon style={{ width: "24px", height: "24px", color: "var(--accent-blue)" }} />
          <h2 className="ds-heading-2">Important News</h2>
        </div>

        <div className="ds-grid" style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "var(--space-xl)"
        }}>
          {loading ? (
            <div className="ds-card">
              <div className="ds-card-body">
                <p className="ds-body-small" style={{ color: "var(--text-tertiary)" }}>
                  Loading news...
                </p>
              </div>
            </div>
          ) : (
            importantNews.map((article) => (
              <Link
                key={article.id}
                href={`/latest-news/${article.id}`}
                className="ds-card ds-card-interactive"
                style={{ textDecoration: "none" }}
              >
                <div className="ds-card-body">
                  <div style={{ marginBottom: "var(--space-md)" }}>
                    <span className="ds-badge ds-badge-blue">{article.source}</span>
                    <span
                      className="ds-body-small"
                      style={{
                        color: "var(--text-tertiary)",
                        marginLeft: "var(--space-sm)"
                      }}
                    >
                      {new Date(article.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="ds-heading-4" style={{ marginBottom: "var(--space-sm)" }}>
                    {article.title}
                  </h3>
                  <p className="ds-body-small" style={{
                    color: "var(--text-secondary)",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}>
                    {article.summary}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>

        <div style={{
          textAlign: "center",
          marginTop: "var(--space-xl)"
        }}>
          <Link href="/latest-news" className="ds-btn ds-btn-tertiary">
            View All News
          </Link>
        </div>
      </section>

      {/* Call to Action Section */}
      <section
        className="ds-card"
        style={{
          marginBottom: "var(--space-4xl)",
          background: "linear-gradient(135deg, rgba(200, 229, 36, 0.05), rgba(153, 85, 235, 0.05))",
          border: "2px solid var(--accent-purple)"
        }}
      >
        <div className="ds-card-body" style={{
          textAlign: "center",
          padding: "var(--space-3xl)"
        }}>
          <h2 className="ds-heading-2" style={{ marginBottom: "var(--space-md)" }}>
            Start Your Learning Journey Today
          </h2>
          <p className="ds-body-large" style={{
            color: "var(--text-secondary)",
            marginBottom: "var(--space-xl)",
            maxWidth: "600px",
            margin: "0 auto var(--space-xl)"
          }}>
            Join thousands of students learning to identify and avoid online scams.
            Complete modules, earn badges, and protect your community.
          </p>
          <div style={{
            display: "flex",
            gap: "var(--space-md)",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            <Link href="/learning-modules" className="ds-btn ds-btn-primary ds-btn-lg">
              Start Learning
            </Link>
            <Link href="/quizzes" className="ds-btn ds-btn-secondary ds-btn-lg">
              Take a Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
