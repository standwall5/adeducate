# SiftHR Redesign & Restructuring Tracker

**Project**: Santo Niño National High School E-Learning Platform for Social Media Scam Awareness  
**Started**: 2025  
**Status**: In Progress

---

## 📋 Project Overview

This is a comprehensive redesign and feature enhancement of the SiftHR platform - an e-learning system designed to educate students about identifying fake social media advertisements and online scams, with a focus on protecting vulnerable populations.

### Key Features:
- Interactive learning modules on scam identification
- Quiz system with multiple question types
- Badge/achievement system
- Latest news aggregation
- Support resources
- Live camera detection (AI-powered)
- Chatbot assistant
- Multi-language support (English/Tagalog)
- Onboarding walkthrough (NextStep.js)

---

## 🎨 Design System

### Color Palette

#### Primary Colors (Accents Only)
- **Lime/Green**: `rgb(200, 229, 36)` - Primary accent, CTAs
- **Purple**: `rgb(153, 85, 235)` - Secondary accent, highlights
- **Blue**: `rgb(131, 165, 240)` - Tertiary accent, links

#### Base Colors (Main Theme)
- **White**: `#FFFFFF` - Primary card background, content areas
- **Off-White**: `#F5F5F5` - Page background (light mode)
- **Black**: `#141414` - Primary text
- **Dark Gray**: `#2A2A2A` - Secondary text, borders
- **Light Gray**: `#E5E5E5` - Dividers, subtle backgrounds

#### Dark Mode
- **Background**: `#16101B` - Main background
- **Card Background**: `#25192E` - Card containers
- **Text**: `#FFFFFF` - Primary text

### Design Principles
1. **Minimalist & Professional**: Clean white/black cards with colorful accents
2. **Consistent Spacing**: Use 8px grid system (0.5rem, 1rem, 1.5rem, 2rem, 3rem)
3. **Typography**: "Geo Sans" primary, "Inter" fallback
4. **Border Radius**: 0.75rem for cards, 0.5rem for buttons
5. **Shadows**: Subtle shadows on cards (0 2px 8px rgba(0,0,0,0.1))
6. **Transitions**: 0.3s ease for hover states

### Component Styling Rules
- **Cards**: White background, subtle shadow, no colored backgrounds
- **Buttons**: Primary = Lime, Secondary = Purple, Tertiary = White with border
- **Accent Usage**: Only for borders, icons, and interactive elements
- **Hover States**: Lift effect (translateY) + shadow + accent color border

---

## 📁 Project Structure (New)

```
sifthr/
├── src/
│   ├── app/
│   │   ├── (auth)/              # Authentication pages
│   │   ├── (logged-in)/
│   │   │   ├── home/            # Dashboard/Homepage
│   │   │   ├── modules/         # Learning modules (renamed from learning-modules)
│   │   │   │   ├── [moduleId]/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ModuleCard.tsx
│   │   │   │   │   ├── ModuleSidebar.tsx (badges panel)
│   │   │   │   │   ├── ModuleFilter.tsx
│   │   │   │   │   ├── FloatingModuleViewer.tsx
│   │   │   │   │   └── ModuleContent.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── quizzes/
│   │   │   │   ├── [quizId]/
│   │   │   │   ├── components/
│   │   │   │   │   ├── QuizCard.tsx
│   │   │   │   │   ├── MultipleChoice.tsx
│   │   │   │   │   ├── CheckboxQuestion.tsx
│   │   │   │   │   ├── InputQuestion.tsx
│   │   │   │   │   └── PinGame.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── news/            # Latest news (renamed from latest-news)
│   │   │   │   ├── components/
│   │   │   │   │   ├── NewsGrid.tsx
│   │   │   │   │   ├── NewsCard.tsx
│   │   │   │   │   ├── RecommendedArticles.tsx
│   │   │   │   │   └── NewsSearch.tsx
│   │   │   │   └── page.tsx
│   │   │   ├── support/
│   │   │   │   └── page.tsx
│   │   │   ├── camera-detection/ # AI detection feature
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   └── admin/
│   │   │       └── pin-game-admin/ # Admin interface for pin game
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Breadcrumbs.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Chatbot.tsx
│   │   │   └── ui/              # Reusable UI components
│   │   ├── lib/
│   │   │   ├── i18n/            # Translation files
│   │   │   │   ├── en.json
│   │   │   │   └── tl.json (Tagalog)
│   │   │   └── supabase/
│   │   └── styles/
│   │       └── design-system.css
├── public/
│   └── assets/
│       └── images/
│           ├── modules/         # Module preview images
│           ├── quizzes/         # Quiz images
│           └── pin-game/        # Pin game images
├── sql/
│   ├── database.sql             # Original schema
│   └── content_inserts.sql      # NEW: All module & quiz content
└── backup_old/                  # OLD CODE BACKUP
```

---

## ✅ Implementation Checklist

### Phase 1: Setup & Preparation
- [x] Read and understand current structure
- [x] Create design system documentation
- [x] Create Git branch `redesign-2025`
- [x] Backup old files to `backup_old/` (directory created)
- [ ] Install additional dependencies if needed
- [ ] Update database schema if needed

### Phase 2: Core Design System
- [x] Create `design-system.css` with new color variables
- [ ] Create shared UI components library
  - [x] Card component (white/black themed) - in design-system.css
  - [x] Button variants (primary, secondary, tertiary) - in design-system.css
  - [x] Input components - in design-system.css
  - [ ] Modal component (redesigned)
- [ ] Update `globals.css` with new design tokens
- [x] Create breadcrumb component
- [ ] Redesign Navbar (more formal)

### Phase 3: Homepage Redesign
- [ ] Update homepage layout
- [ ] Smaller card designs with template images
- [ ] Add "Recommended Modules" section (small cards)
- [ ] Add "Recommended Quizzes" section (small cards)
- [ ] Add "Important News" section (one row)
- [ ] Apply new white/black card styling
- [ ] Add proper spacing and grid layout

### Phase 4: Learning Modules Section
- [ ] Create left sidebar for badges display
  - [ ] Fetch user badges from database
  - [ ] Display badge icons and progress
  - [ ] Responsive collapse on mobile
- [ ] Create floating module card (center/right)
  - [ ] Single featured module display
  - [ ] White card with accent borders
  - [ ] Clean typography
- [ ] Create bottom module grid (all modules)
  - [ ] Filter by topic (phishing, fake products, scholarships, etc.)
  - [ ] Filter by difficulty (easy, medium, hard)
  - [ ] Sort functionality
  - [ ] Search integration
- [ ] Module content viewer
  - [ ] Clean reading experience
  - [ ] Progress tracking
  - [ ] Next/Previous navigation

### Phase 5: Quiz System Enhancement
- [ ] Update quiz listing page design
- [ ] Multiple Choice component
  - [ ] Radio button styling
  - [ ] Answer feedback
- [ ] Checkbox Question component
  - [ ] Multiple selection
  - [ ] Validation
- [ ] Input Answer component (one-word)
  - [ ] Text input with validation
  - [ ] Case-insensitive checking
- [ ] Pin Game component
  - [ ] Image display
  - [ ] Click/tap to place pins
  - [ ] Tolerance-based validation
  - [ ] Visual feedback
- [ ] Quiz results page
  - [ ] Score display
  - [ ] Badge awards
  - [ ] Retry functionality

### Phase 6: Pin Game Admin Interface
- [ ] Admin dashboard for pin game creation
- [ ] Image upload interface
- [ ] Interactive pin placement tool
  - [ ] Click to set correct pin locations
  - [ ] Visual markers for pins
  - [ ] Tolerance radius setting
  - [ ] Save/Update functionality
- [ ] Preview mode for testing

### Phase 7: Latest News Section
- [ ] Three-column layout
  - [ ] Left: News feed (main content)
  - [ ] Top: Search bar
  - [ ] Right: Recommended articles sidebar
- [ ] News card redesign (white cards)
- [ ] Search functionality
- [ ] Filter/sort options
- [ ] Pagination
- [ ] Recommendation algorithm (TBD)

### Phase 8: Content Creation (SQL Inserts)

#### Learning Modules Topics:
1. **Online Scholarship Scams** (Easy, Medium, Hard) - [x] COMPLETED
2. **Fake Product Advertisements** (Easy, Medium, Hard) - [x] PARTIALLY COMPLETED (2/3)
3. **Phishing & Account Takeovers** (Easy, Medium, Hard) - [x] PARTIALLY COMPLETED (1/3)
4. **Romance & Investment Scams** (Easy, Medium, Hard) - [x] PARTIALLY COMPLETED (1/3)
5. **Job Offer Scams** (Easy, Medium, Hard) - [x] PARTIALLY COMPLETED (1/3)
6. **Free Prize/Giveaway Scams** (Easy, Medium, Hard) - [ ] NOT STARTED
7. **Impersonation Scams** (Easy, Medium, Hard) - [ ] NOT STARTED
8. **Crypto/NFT Scams** (Medium, Hard) - [ ] NOT STARTED

#### Content Requirements per Module:
- [x] Module title and description
- [x] 3-5 sections with content
- [x] Real examples (text descriptions)
- [x] Red flags to identify
- [x] Prevention tips
- [x] Resources/links
- [x] Associated quiz (if medium/hard)

#### Quiz Requirements:
- [x] 5-10 questions per quiz
- [x] Mix of question types
- [x] Realistic scenarios
- [x] Clear explanations for answers
- [x] At least 2 pin game questions per quiz

**STATUS**: 8 modules created, 3 quizzes created with comprehensive content. Badge and milestone system defined. Approximately 40% of total content complete.

### Phase 9: Chatbot Integration
- [ ] Research chatbot solution (options):
  - [ ] OpenAI API integration
  - [ ] Custom RAG model with module content
  - [ ] Pre-programmed decision tree
- [ ] Design chatbot UI
  - [ ] Floating chat button
  - [ ] Chat window overlay
  - [ ] Message bubbles
- [ ] Implement chat logic
  - [ ] Context awareness (current page)
  - [ ] Module content reference
  - [ ] Scenario-based responses
  - [ ] "What should I do if..." queries
- [ ] Add Tagalog support
- [ ] Test conversation flows

### Phase 10: Internationalization (i18n)
- [ ] Set up Next.js i18n routing
- [ ] Create translation files
  - [ ] English (en.json)
  - [ ] Tagalog (tl.json)
- [ ] Translate all UI text
- [ ] Translate module content
- [ ] Translate quiz questions
- [ ] Add language switcher to navbar
- [ ] Persist language preference

### Phase 11: Onboarding Walkthrough (NextStep.js)
- [ ] Install/verify nextstepjs package
- [ ] Create walkthrough tours:
  - [ ] First-time user tour
  - [ ] Homepage features
  - [ ] Module navigation
  - [ ] Quiz taking
  - [ ] Badge system
  - [ ] Chatbot usage
- [ ] Add "Help" button to trigger tours
- [ ] Track completion in user profile

### Phase 12: Camera Detection Feature
- [ ] Complete implementation (currently unfinished)
- [ ] Phone screen detection model
- [ ] Fake ad detection within screen
- [ ] Accuracy percentage display
- [ ] Real-time processing
- [ ] User feedback/reporting
- [ ] Redesign UI with new design system

### Phase 13: Support Page Enhancement
- [ ] Review current support page
- [ ] Add FAQ section
- [ ] Contact form
- [ ] Resource links
- [ ] Emergency reporting
- [ ] Apply new design system

### Phase 14: Testing & Quality Assurance
- [ ] Cross-browser testing
- [ ] Mobile responsiveness
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG 2.1)
- [ ] User testing with students
- [ ] Fix bugs and issues

### Phase 15: Documentation
- [ ] Update README.md
- [ ] Create deployment guide
- [ ] Document API endpoints
- [ ] Create admin user guide
- [ ] Create student user guide
- [ ] Comment code thoroughly

### Phase 16: Deployment Preparation
- [ ] Environment variables check
- [ ] Database migration plan
- [ ] Backup strategy
- [ ] Rollback plan
- [ ] Performance monitoring setup

---

## 📝 Content Guidelines

### Module Content Structure
Each module should follow this format:

```
Module Title: [Descriptive, clear title]
Difficulty: [Easy/Medium/Hard]
Topic: [Category]
Estimated Time: [X minutes]

Section 1: Introduction
- What is this type of scam?
- Why is it dangerous?
- Who is typically targeted?

Section 2: Real Examples
- Example 1 with description
- Example 2 with description
- Screenshot descriptions (what to look for)

Section 3: Red Flags
- Warning sign 1
- Warning sign 2
- Warning sign 3
- etc.

Section 4: How to Verify
- Step-by-step verification process
- Tools/resources to use
- Official sources to check

Section 5: Prevention & Protection
- What to do if encountered
- How to report
- How to protect yourself
- What NOT to do

Resources:
- Link 1 (legitimate source)
- Link 2 (legitimate source)
```

### Quiz Content Guidelines
- Questions should be realistic scenarios
- Multiple choice: 4 options, 1 correct
- Checkbox: Multiple correct answers possible
- Input: One-word or short phrase answers
- Pin game: Use realistic fake ad examples
- Always explain why an answer is correct/incorrect

---

## 🗄️ Database Schema Updates

### New/Modified Tables Needed:

```sql
-- Add difficulty and topic fields to modules
ALTER TABLE modules ADD COLUMN difficulty TEXT CHECK(difficulty IN ('easy', 'medium', 'hard'));
ALTER TABLE modules ADD COLUMN topic TEXT;
ALTER TABLE modules ADD COLUMN estimated_minutes INTEGER;
ALTER TABLE modules ADD COLUMN thumbnail_url TEXT;

-- Add recommended flags for homepage
ALTER TABLE modules ADD COLUMN is_recommended BOOLEAN DEFAULT FALSE;
ALTER TABLE quizzes ADD COLUMN is_recommended BOOLEAN DEFAULT FALSE;

-- Pin game improvements
ALTER TABLE questions ADD COLUMN pin_count INTEGER DEFAULT 1;
ALTER TABLE questions ADD COLUMN pins JSONB; -- Store multiple pins [{x, y, tolerance}]

-- Chatbot conversation history
CREATE TABLE chatbot_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  context TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Language preferences
ALTER TABLE users ADD COLUMN preferred_language TEXT DEFAULT 'en';
ALTER TABLE users ADD COLUMN completed_onboarding BOOLEAN DEFAULT FALSE;
```

---

## 🚀 Technical Stack

### Current Dependencies:
- Next.js 15.5.9
- React 19.1.0
- Supabase (Authentication & Database)
- TensorFlow.js (Camera detection)
- NextStep.js (Walkthrough)
- Tailwind CSS
- TypeScript

### To Be Added:
- [ ] AI/Chatbot library (TBD - OpenAI/Anthropic/Custom)
- [ ] i18n library (next-intl or next-i18next)
- [ ] Image annotation library for admin pin placement
- [ ] Additional UI component libraries if needed

---

## 🎯 Success Metrics

### Technical Goals:
- [ ] Page load time < 3 seconds
- [ ] Mobile responsive (100% features)
- [ ] Accessibility score > 90
- [ ] Zero critical bugs

### Content Goals:
- [ ] 24+ complete modules (3 per topic × 8 topics)
- [ ] 16+ quizzes with quality questions
- [ ] 100% content translated to Tagalog
- [ ] Chatbot handles 90% of common queries

### User Experience Goals:
- [ ] Clear visual hierarchy
- [ ] Intuitive navigation
- [ ] Engaging learning experience
- [ ] Helpful feedback mechanisms

---

## 📌 Important Notes

### Design Consistency Rules:
1. **Never use colored backgrounds on cards** - Only white/black
2. **Accent colors for**: borders on hover, icons, buttons, badges, progress bars
3. **Typography hierarchy**: H1 (2rem), H2 (1.5rem), H3 (1.25rem), Body (1rem)
4. **Spacing consistency**: Always use 8px grid multiples
5. **Animation timing**: 0.3s for hovers, 0.5s for page transitions

### Content Writing Guidelines:
1. Write for high school student reading level
2. Use clear, simple language
3. Provide real-world examples
4. Be culturally sensitive
5. Include both English and Tagalog terminology
6. Cite legitimate sources

### Development Best Practices:
1. Component-based architecture
2. Reusable design system components
3. TypeScript for type safety
4. Proper error handling
5. Loading states for all async operations
6. Optimistic UI updates where appropriate

---

## 🔄 Progress Updates

### Session 1 - January 2025
- Created redesign tracker document
- Analyzed current structure
- Defined design system
- Planned implementation phases
- Created Git branch `redesign-2025`
- Built comprehensive design system CSS file
- Created content_inserts.sql with 8 complete modules
- Implemented Breadcrumbs component
- Set up backup directory structure
- Created 10 badges and 10 milestones for gamification

**Files Created**:
- `/REDESIGN_TRACKER.md` - Complete project tracking document
- `/src/app/styles/design-system.css` - Design system with white/black cards and accent colors
- `/sql/content_inserts.sql` - Educational content for modules and quizzes
- `/src/app/components/shared/Breadcrumbs.tsx` - Navigation breadcrumbs
- `/backup_old/` - Directory for backing up old files

**Next Session Priorities**:
1. Complete remaining module content (16 more modules needed)
2. Redesign homepage with new card layout
3. Implement module sidebar with badges display
4. Create pin game admin interface
5. Integrate chatbot system

### Session 2 - [Date]
- [To be updated as work progresses]

---

## 🆘 Handoff Instructions for Other AI

If another AI continues this work:

1. **Read this document fully** - It contains all design decisions and requirements
2. **Check the Git branch** - Work should be in `redesign-2025` branch
3. **Reference the design system** - Follow color palette and component rules strictly
4. **Content is critical** - Don't skip module/quiz content creation
5. **Test frequently** - Verify changes don't break existing functionality
6. **Update this tracker** - Mark completed items and add notes
7. **Backup first** - Never delete old code without backing up

### Current Status When Handed Off:
- [x] Phase completed: Phase 1 (Setup) - 100%, Phase 2 (Design System) - 60%
- [ ] Next priority: Complete Phase 8 (Content Creation), then Phase 3 (Homepage Redesign)
- [ ] Known issues: None yet - fresh implementation
- [x] Important context: 
  - Design system uses CSS variables for easy theming
  - All accent colors (lime, purple, blue) are ONLY for borders, icons, buttons
  - Card backgrounds MUST be white/black only
  - Content is written for Filipino high school students
  - Pin game images need to be created/sourced separately
  - SQL inserts assume sequential IDs - adjust if needed

---

## 📚 Resources & References

### Design Inspiration:
- Duolingo (gamification)
- Khan Academy (learning modules)
- Medium (content layout)
- Linear (minimalist design)

### Content Resources:
- Philippine National Police Cybercrime Division
- DTI Consumer Protection
- Facebook Safety Center
- DICT Cybersecurity resources

### Technical Documentation:
- Next.js 15 docs: https://nextjs.org/docs
- Supabase docs: https://supabase.com/docs
- NextStep.js: https://www.nextstepjs.com/
- TensorFlow.js: https://www.tensorflow.org/js

---

**Last Updated**: January 2025 - Session 1
**Current Phase**: Phase 2 - Core Design System (60% complete)
**Overall Completion**: 15%

---

## 🎨 Quick Reference: Design System Usage

### Using Design System Classes

**Cards**:
```html
<div className="ds-card ds-card-accent-purple">
  <div className="ds-card-body">
    Content here
  </div>
</div>
```

**Buttons**:
```html
<button className="ds-btn ds-btn-primary">Primary Action</button>
<button className="ds-btn ds-btn-secondary">Secondary Action</button>
<button className="ds-btn ds-btn-tertiary">Tertiary Action</button>
```

**Typography**:
```html
<h1 className="ds-heading-1">Main Title</h1>
<h2 className="ds-heading-2">Section Title</h2>
<p className="ds-body">Regular text content</p>
```

**Badges**:
```html
<span className="ds-badge ds-badge-lime">Easy</span>
<span className="ds-badge ds-badge-purple">Medium</span>
<span className="ds-badge ds-badge-blue">Hard</span>
```

### Color Usage Rules
- **Cards**: Always white (`--bg-card`) or black in dark mode
- **Text**: Use `--text-primary`, `--text-secondary`, `--text-tertiary`
- **Accents**: Only for borders, icons, buttons, badges
- **Hover states**: Add accent color border or subtle lift effect
- **Never**: Color entire card backgrounds with accent colors

### Spacing System
Use CSS variables: `var(--space-xs)` through `var(--space-4xl)`
Based on 8px grid: 4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px