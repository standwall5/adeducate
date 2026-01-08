# SiftHR - Social Media Scam Awareness E-Learning Platform

**For**: Santo Niño National High School Students  
**Purpose**: Teaching students to identify fake social media advertisements and online scams  
**Status**: Redesign in Progress (Branch: `redesign-2025`)

---

## 🎯 Project Overview

SiftHR is an interactive e-learning platform designed to educate Filipino high school students about identifying and avoiding fraudulent social media advertisements and online scams. The platform features:

- 📚 **24 Learning Modules** across 8 scam topics
- 🎮 **Interactive Quizzes** with multiple question types
- 🎯 **Pin Game** - Click to identify fake elements in ads
- 🏆 **Badge System** - Gamification and achievement tracking
- 📰 **Latest News** - Scam alerts and cybersecurity updates
- 💬 **Chatbot Assistant** - Contextual help and guidance
- 🌐 **Bilingual** - Full English and Tagalog support
- 🎥 **Camera Detection** - AI-powered fake ad identification

---

## 🚀 Current Status: Redesign Project

We are currently implementing a **comprehensive redesign** focusing on:

1. **Modern Design System** - White/black cards with lime/purple/blue accents
2. **Enhanced Content** - Complete educational modules on Philippine scam landscape
3. **Improved UX** - Better navigation, breadcrumbs, walkthroughs
4. **New Features** - Chatbot, advanced pin game, multilingual support

### Branch: `redesign-2025`

**Completion**: ~15% (Foundation Complete)

**Read These First**:
- 📋 **REDESIGN_TRACKER.md** - Complete project plan and progress (547 lines)
- 🚀 **IMPLEMENTATION_GUIDE.md** - Developer guide with code examples (734 lines)
- 📊 **HANDOFF_SUMMARY.md** - Current status and next steps (569 lines)
- ✅ **TASK_CHECKLIST.md** - Detailed task breakdown (458 lines)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.9 (React 19.1.0)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS 4 + Custom Design System
- **AI/ML**: TensorFlow.js (camera detection)
- **Walkthrough**: NextStep.js 2.1.2
- **Icons**: Heroicons

---

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd sifthr

# Switch to redesign branch
git checkout redesign-2025

# Install dependencies
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI (for chatbot - optional)
OPENAI_API_KEY=your_openai_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup
Run these SQL files in order on your Supabase database:

```bash
1. sql/database.sql          # Base schema (if fresh install)
2. sql/schema_updates.sql    # New fields and tables for redesign
3. sql/content_inserts.sql   # 8 modules + 3 quizzes + badges
```

### Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
sifthr/
├── REDESIGN_TRACKER.md          # Main project documentation
├── IMPLEMENTATION_GUIDE.md      # Developer guide
├── HANDOFF_SUMMARY.md          # Status summary
├── TASK_CHECKLIST.md           # Task list
│
├── sql/
│   ├── database.sql            # Original schema
│   ├── schema_updates.sql      # NEW: Redesign schema additions
│   └── content_inserts.sql     # NEW: Educational content
│
├── src/app/
│   ├── styles/
│   │   └── design-system.css   # NEW: Complete design system
│   │
│   ├── components/
│   │   └── shared/
│   │       └── Breadcrumbs.tsx # NEW: Navigation breadcrumbs
│   │
│   ├── (auth)/                 # Login/signup pages
│   ├── (logged-in)/
│   │   ├── home/              # Dashboard
│   │   ├── modules/           # Learning modules (in progress)
│   │   ├── quizzes/           # Quiz system (in progress)
│   │   ├── news/              # Latest news
│   │   ├── support/           # Help and resources
│   │   └── camera-detection/  # AI detection feature
│   │
│   └── api/                   # Backend API routes
│
└── public/
    └── assets/
        ├── images/
        └── badges/
```

---

## 🎨 Design System

The redesigned platform uses a **minimalist design system** with strict rules:

### Core Principles
1. **White/Black Cards Only** - No colored backgrounds on content cards
2. **Accent Colors** - Lime/Purple/Blue used ONLY for:
   - Borders on hover
   - Icons and badges
   - Buttons
   - Interactive elements
3. **8px Grid System** - Consistent spacing
4. **Professional Typography** - Clear hierarchy

### Using the Design System

Import in your component:
```tsx
import "@/app/styles/design-system.css";
```

Use design system classes:
```tsx
// Card
<div className="ds-card ds-card-interactive ds-card-accent-purple">
  <div className="ds-card-body">
    <h2 className="ds-heading-3">Title</h2>
    <p className="ds-body">Content</p>
  </div>
</div>

// Buttons
<button className="ds-btn ds-btn-primary">Primary</button>
<button className="ds-btn ds-btn-secondary">Secondary</button>

// Badges
<span className="ds-badge ds-badge-lime">Easy</span>
<span className="ds-badge ds-badge-purple">Medium</span>
```

See `IMPLEMENTATION_GUIDE.md` for complete examples.

---

## 📚 Educational Content

### Topics Covered
1. **Online Scholarship Scams** - Fake education funding offers
2. **Fake Product Advertisements** - Counterfeit goods and deals
3. **Phishing & Account Takeovers** - Stolen credentials and identity theft
4. **Investment & Romance Scams** - Financial fraud schemes
5. **Job Offer Scams** - Fraudulent employment opportunities
6. **Free Prize/Giveaway Scams** - Too-good-to-be-true offers (coming soon)
7. **Impersonation Scams** - Fake accounts and identities (coming soon)
8. **Crypto/NFT Scams** - Blockchain-based fraud (coming soon)

### Content Structure
Each module includes:
- Introduction and context
- Real examples from Philippines
- Red flags to identify
- Verification methods
- Protection and reporting steps
- Links to official resources

---

## 🎮 Features

### Completed
- ✅ Design system with CSS variables
- ✅ Breadcrumb navigation
- ✅ 8 comprehensive learning modules
- ✅ 3 quizzes with mixed question types
- ✅ Badge and milestone system
- ✅ Database schema for all features

### In Progress
- 🔄 Homepage redesign with recommendations
- 🔄 Module section with badges sidebar
- 🔄 Quiz system with pin game
- 🔄 Pin game admin interface

### Planned
- ⏳ Chatbot assistant (OpenAI integration)
- ⏳ Tagalog translation (i18n)
- ⏳ Onboarding walkthrough (NextStep.js)
- ⏳ Camera detection completion
- ⏳ Remaining 16 modules
- ⏳ News section redesign

---

## 🤝 Contributing

### For Developers Continuing This Project

1. **Read Documentation First**
   - Start with `REDESIGN_TRACKER.md`
   - Reference `IMPLEMENTATION_GUIDE.md` for code
   - Use `TASK_CHECKLIST.md` for tasks

2. **Follow Design System Rules**
   - White/black cards only
   - Accents for borders/icons/buttons only
   - Use CSS variables consistently

3. **Content Writing Guidelines**
   - High school reading level
   - Filipino context and examples
   - Cite legitimate sources (.gov.ph)
   - Actionable, practical advice

4. **Testing Requirements**
   - Cross-browser compatibility
   - Mobile responsiveness
   - Accessibility (WCAG 2.1 AA)
   - Performance (Lighthouse > 90)

### Git Workflow
```bash
# Always work on redesign branch
git checkout redesign-2025

# Make changes
git add .
git commit -m "feat: description of changes"

# Push
git push origin redesign-2025
```

---

## 📞 Resources & References

### Philippine Cybersecurity Resources
- [CHED Scholarships](https://ched.gov.ph/)
- [NBI Cybercrime Division](https://www.nbi.gov.ph/)
- [PNP Anti-Cybercrime Group](https://www.pnp.gov.ph/acg)
- [DICT Cybersecurity](https://dict.gov.ph/cybersecurity/)

### Technical Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [NextStep.js](https://www.nextstepjs.com/)
- [TensorFlow.js](https://www.tensorflow.org/js)

---

## 📊 Progress Tracking

**Current Phase**: Phase 2 - Core Design System (60% complete)  
**Overall Completion**: ~15%  
**Last Updated**: January 2025

### Completed Phases
- ✅ Phase 1: Setup & Preparation (100%)
- 🔄 Phase 2: Core Design System (60%)

### Next Priorities
1. Complete Phase 8: Content Creation (40% done, need 16 more modules)
2. Complete Phase 3: Homepage Redesign (20% done)
3. Start Phase 4: Module Section (0% done)

---

## 🐛 Known Issues

- Design system not yet imported globally (need to add to layout.tsx)
- Homepage still uses old colorful card design (replacement ready)
- Pin game images not created yet (need 20+ examples)
- API endpoints need updating for new database fields

---

## 📝 License

This project is for educational purposes for Santo Niño National High School.

---

## 🙏 Acknowledgments

- Santo Niño National High School
- Philippine National Police Cybercrime Division
- Department of Information and Communications Technology
- All contributors to this educational initiative

---

**For Questions or Issues**: Refer to documentation files in root directory or create an issue in the repository.

**Next Developer**: Everything you need is documented. Good luck! 🚀