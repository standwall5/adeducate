-- ============================================================================
-- SiftHR Schema Updates for Redesign
-- ============================================================================
-- Run these ALTER statements after the base schema (database.sql)
-- These add new fields needed for the redesigned features
-- ============================================================================

-- ============================================================================
-- MODULE ENHANCEMENTS
-- ============================================================================

-- Add difficulty, topic, and other metadata to modules
ALTER TABLE modules ADD COLUMN IF NOT EXISTS difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard'));
ALTER TABLE modules ADD COLUMN IF NOT EXISTS topic TEXT;
ALTER TABLE modules ADD COLUMN IF NOT EXISTS estimated_minutes INTEGER DEFAULT 15;
ALTER TABLE modules ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
ALTER TABLE modules ADD COLUMN IF NOT EXISTS is_recommended BOOLEAN DEFAULT FALSE;
ALTER TABLE modules ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE modules ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Add index for filtering by difficulty and topic
CREATE INDEX IF NOT EXISTS idx_modules_difficulty ON modules(difficulty);
CREATE INDEX IF NOT EXISTS idx_modules_topic ON modules(topic);
CREATE INDEX IF NOT EXISTS idx_modules_recommended ON modules(is_recommended);

-- ============================================================================
-- QUIZ ENHANCEMENTS
-- ============================================================================

-- Add recommended flag and metadata to quizzes
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS is_recommended BOOLEAN DEFAULT FALSE;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS passing_score INTEGER DEFAULT 70;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS time_limit_minutes INTEGER;
ALTER TABLE quizzes ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- ============================================================================
-- QUESTION TYPE ENHANCEMENTS - PIN GAME
-- ============================================================================

-- Extend questions table to support multiple pins in one image
ALTER TABLE questions ADD COLUMN IF NOT EXISTS pin_count INTEGER DEFAULT 1;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS pins JSONB;

-- JSONB structure for pins: [{"x": 100, "y": 200, "tolerance": 50}, {...}]
-- This allows multiple suspicious elements to be marked in a single image

-- Add index for pin game questions
CREATE INDEX IF NOT EXISTS idx_questions_type ON questions(question_type);

-- Migration note: For existing pin_game questions, migrate to JSONB format:
-- UPDATE questions
-- SET pins = jsonb_build_array(
--   jsonb_build_object(
--     'x', pin_x_coordinate,
--     'y', pin_y_coordinate,
--     'tolerance', COALESCE(pin_tolerance, 50)
--   )
-- )
-- WHERE question_type = 'pin_game' AND pins IS NULL;

-- ============================================================================
-- CHATBOT SYSTEM
-- ============================================================================

-- Store chatbot conversation history
CREATE TABLE IF NOT EXISTS chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  context_module_id INTEGER REFERENCES modules(id),
  context_page TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chatbot_user ON chatbot_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_session ON chatbot_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_chatbot_created ON chatbot_conversations(created_at);

-- Chatbot feedback system
CREATE TABLE IF NOT EXISTS chatbot_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES chatbot_conversations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  helpful BOOLEAN,
  feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- USER PREFERENCES & SETTINGS
-- ============================================================================

-- Add language preference and onboarding status to users
ALTER TABLE users ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'en' CHECK(preferred_language IN ('en', 'tl'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS completed_onboarding BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS theme_preference TEXT DEFAULT 'light' CHECK(theme_preference IN ('light', 'dark', 'system'));
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index for active users
CREATE INDEX IF NOT EXISTS idx_users_last_active ON users(last_active);

-- ============================================================================
-- ONBOARDING / WALKTHROUGH TRACKING
-- ============================================================================

-- Track which walkthroughs users have completed
CREATE TABLE IF NOT EXISTS user_walkthroughs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  walkthrough_id TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  steps_completed JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, walkthrough_id)
);

CREATE INDEX IF NOT EXISTS idx_walkthroughs_user ON user_walkthroughs(user_id);

-- ============================================================================
-- NEWS ENHANCEMENTS
-- ============================================================================

-- Add category and reading tracking for news articles
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS views_count INTEGER DEFAULT 0;
ALTER TABLE news_articles ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Track which articles users have read
CREATE TABLE IF NOT EXISTS news_reading_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES news_articles(id) ON DELETE CASCADE,
  read_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read_duration_seconds INTEGER,
  UNIQUE(user_id, article_id)
);

CREATE INDEX IF NOT EXISTS idx_news_reading_user ON news_reading_history(user_id);
CREATE INDEX IF NOT EXISTS idx_news_reading_article ON news_reading_history(article_id);

-- ============================================================================
-- SCAM REPORTING SYSTEM
-- ============================================================================

-- Allow users to report scams they encounter
CREATE TABLE IF NOT EXISTS scam_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  scam_type TEXT NOT NULL,
  platform TEXT NOT NULL,
  description TEXT NOT NULL,
  url TEXT,
  screenshot_url TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'verified', 'rejected', 'duplicate')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES users(id)
);

CREATE INDEX IF NOT EXISTS idx_scam_reports_user ON scam_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_scam_reports_status ON scam_reports(status);
CREATE INDEX IF NOT EXISTS idx_scam_reports_type ON scam_reports(scam_type);

-- ============================================================================
-- ANALYTICS & METRICS
-- ============================================================================

-- Track detailed learning analytics
CREATE TABLE IF NOT EXISTS learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER REFERENCES modules(id) ON DELETE CASCADE,
  quiz_id INTEGER REFERENCES quizzes(id) ON DELETE CASCADE,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INTEGER,
  score_percentage INTEGER,
  device_type TEXT,
  browser TEXT
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON learning_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_module ON learning_sessions(module_id);
CREATE INDEX IF NOT EXISTS idx_sessions_date ON learning_sessions(started_at);

-- ============================================================================
-- BADGE ENHANCEMENTS
-- ============================================================================

-- Add more metadata to badges
ALTER TABLE badges ADD COLUMN IF NOT EXISTS rarity TEXT DEFAULT 'common' CHECK(rarity IN ('common', 'rare', 'epic', 'legendary'));
ALTER TABLE badges ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 10;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN DEFAULT FALSE;

-- ============================================================================
-- MODULE RATINGS & FEEDBACK
-- ============================================================================

-- Allow users to rate and review modules
CREATE TABLE IF NOT EXISTS module_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
  review_text TEXT,
  is_helpful BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

CREATE INDEX IF NOT EXISTS idx_ratings_module ON module_ratings(module_id);
CREATE INDEX IF NOT EXISTS idx_ratings_user ON module_ratings(user_id);

-- ============================================================================
-- NOTIFICATION SYSTEM
-- ============================================================================

-- In-app notifications for users
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;

-- ============================================================================
-- CAMERA DETECTION LOGS
-- ============================================================================

-- Store camera detection results for improvement and analysis
CREATE TABLE IF NOT EXISTS detection_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  image_url TEXT,
  detections JSONB NOT NULL,
  confidence_scores JSONB,
  user_feedback TEXT,
  is_correct BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_detection_user ON detection_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_detection_date ON detection_logs(created_at);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to modules table
DROP TRIGGER IF EXISTS update_modules_updated_at ON modules;
CREATE TRIGGER update_modules_updated_at
    BEFORE UPDATE ON modules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to update user's last_active
CREATE OR REPLACE FUNCTION update_user_last_active()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users SET last_active = NOW() WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger on learning_sessions
DROP TRIGGER IF EXISTS update_last_active_on_session ON learning_sessions;
CREATE TRIGGER update_last_active_on_session
    AFTER INSERT ON learning_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_user_last_active();

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

-- View for module completion statistics
CREATE OR REPLACE VIEW module_completion_stats AS
SELECT
    m.id AS module_id,
    m.title,
    m.difficulty,
    m.topic,
    COUNT(DISTINCT mp.user_id) AS users_started,
    COUNT(DISTINCT CASE WHEN ls.completed_at IS NOT NULL THEN mp.user_id END) AS users_completed,
    ROUND(AVG(ls.score_percentage), 2) AS avg_score,
    ROUND(AVG(ls.duration_seconds) / 60.0, 2) AS avg_duration_minutes
FROM modules m
LEFT JOIN module_progress mp ON m.id = mp.module_id
LEFT JOIN learning_sessions ls ON m.id = ls.module_id
GROUP BY m.id, m.title, m.difficulty, m.topic;

-- View for user progress summary
CREATE OR REPLACE VIEW user_progress_summary AS
SELECT
    u.id AS user_id,
    u.name,
    COUNT(DISTINCT mp.module_id) AS modules_started,
    COUNT(DISTINCT CASE WHEN ls.completed_at IS NOT NULL THEN mp.module_id END) AS modules_completed,
    COUNT(DISTINCT qs.quiz_id) AS quizzes_taken,
    COUNT(DISTINCT ub.badge_id) AS badges_earned,
    us.current_streak,
    us.longest_streak,
    ROUND(AVG(qs.score), 2) AS avg_quiz_score
FROM users u
LEFT JOIN module_progress mp ON u.id = mp.user_id
LEFT JOIN learning_sessions ls ON u.id = ls.user_id
LEFT JOIN quiz_submissions qs ON u.id = qs.user_id
LEFT JOIN user_badges ub ON u.id = ub.user_id
LEFT JOIN user_streaks us ON u.id = us.user_id
GROUP BY u.id, u.name, us.current_streak, us.longest_streak;

-- ============================================================================
-- SEED DATA FOR TESTING
-- ============================================================================

-- Insert walkthrough definitions
INSERT INTO user_walkthroughs (user_id, walkthrough_id, completed)
SELECT id, 'firstVisitTour', FALSE FROM users
ON CONFLICT (user_id, walkthrough_id) DO NOTHING;

-- ============================================================================
-- MIGRATION NOTES
-- ============================================================================

-- After running this schema update:
-- 1. Run content_inserts.sql to populate modules and quizzes
-- 2. Ensure all existing modules have difficulty and topic set
-- 3. Generate thumbnail images for modules
-- 4. Set up chatbot API credentials in environment variables
-- 5. Configure notification preferences for users
-- 6. Test camera detection logging
-- 7. Verify badge awarding logic works with new fields

-- ============================================================================
-- ROLLBACK SCRIPT (Use if needed)
-- ============================================================================

/*
-- Uncomment to rollback changes:

DROP VIEW IF EXISTS user_progress_summary;
DROP VIEW IF EXISTS module_completion_stats;
DROP TABLE IF EXISTS detection_logs CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS module_ratings CASCADE;
DROP TABLE IF EXISTS learning_sessions CASCADE;
DROP TABLE IF EXISTS scam_reports CASCADE;
DROP TABLE IF EXISTS news_reading_history CASCADE;
DROP TABLE IF EXISTS user_walkthroughs CASCADE;
DROP TABLE IF EXISTS chatbot_feedback CASCADE;
DROP TABLE IF EXISTS chatbot_conversations CASCADE;

ALTER TABLE modules DROP COLUMN IF EXISTS difficulty;
ALTER TABLE modules DROP COLUMN IF EXISTS topic;
ALTER TABLE modules DROP COLUMN IF EXISTS estimated_minutes;
ALTER TABLE modules DROP COLUMN IF EXISTS thumbnail_url;
ALTER TABLE modules DROP COLUMN IF EXISTS is_recommended;
ALTER TABLE modules DROP COLUMN IF EXISTS created_at;
ALTER TABLE modules DROP COLUMN IF EXISTS updated_at;

ALTER TABLE quizzes DROP COLUMN IF EXISTS is_recommended;
ALTER TABLE quizzes DROP COLUMN IF EXISTS passing_score;
ALTER TABLE quizzes DROP COLUMN IF EXISTS time_limit_minutes;
ALTER TABLE quizzes DROP COLUMN IF EXISTS created_at;

ALTER TABLE questions DROP COLUMN IF EXISTS pin_count;
ALTER TABLE questions DROP COLUMN IF EXISTS pins;

ALTER TABLE users DROP COLUMN IF EXISTS preferred_language;
ALTER TABLE users DROP COLUMN IF EXISTS completed_onboarding;
ALTER TABLE users DROP COLUMN IF EXISTS theme_preference;
ALTER TABLE users DROP COLUMN IF EXISTS last_active;

ALTER TABLE news_articles DROP COLUMN IF EXISTS category;
ALTER TABLE news_articles DROP COLUMN IF EXISTS views_count;
ALTER TABLE news_articles DROP COLUMN IF EXISTS is_featured;

ALTER TABLE badges DROP COLUMN IF EXISTS rarity;
ALTER TABLE badges DROP COLUMN IF EXISTS points;
ALTER TABLE badges DROP COLUMN IF EXISTS is_hidden;
*/
