# SiftHR Implementation Quick Start Guide

**Last Updated**: January 2025  
**For**: Next developer continuing this project  
**Branch**: `redesign-2025`

---

## 🚀 Getting Started

### What Has Been Done

1. **Design System Created** (`/src/app/styles/design-system.css`)
   - Complete CSS variable system
   - White/black card theme with lime/purple/blue accents
   - Reusable component classes (buttons, cards, inputs, badges)
   - Dark mode support

2. **Educational Content Created** (`/sql/content_inserts.sql`)
   - 8 complete learning modules with 3-5 sections each
   - 3 quizzes with multiple question types
   - 10 badges and 10 milestones for gamification
   - Topics: Scholarship scams, fake products, phishing, investment scams, job scams

3. **Components Started**
   - Breadcrumbs component (`/src/app/components/shared/Breadcrumbs.tsx`)
   - Design system utilities ready to use

4. **Documentation**
   - Comprehensive tracker (`/REDESIGN_TRACKER.md`)
   - This implementation guide

### What Needs To Be Done Next

**PRIORITY 1**: Complete Content (Phase 8)
- Add 16 more modules (6 more topics)
- Create remaining quizzes
- Total needed: 24 modules, 16+ quizzes

**PRIORITY 2**: Homepage Redesign (Phase 3)
- Smaller cards with white/black design
- Add recommended modules/quizzes section
- Add important news preview
- Apply design system classes

**PRIORITY 3**: Module Section Redesign (Phase 4)
- Left sidebar for badges
- Floating module viewer
- Module grid with filters
- Topic and difficulty sorting

**PRIORITY 4**: Quiz System (Phase 5)
- Update quiz UI with new design
- Implement pin game component
- Create admin interface for pin game

**PRIORITY 5**: Chatbot (Phase 9)
- Research and select chatbot solution
- Implement chat UI
- Add scenario-based responses

---

## 📁 File Structure

```
sifthr/
├── REDESIGN_TRACKER.md          # Main tracking document (READ THIS FIRST)
├── IMPLEMENTATION_GUIDE.md      # This file
├── backup_old/                  # Backup directory for old code
├── sql/
│   ├── database.sql             # Original schema
│   └── content_inserts.sql      # NEW: Module content (8 modules done)
├── src/
│   └── app/
│       ├── styles/
│       │   └── design-system.css    # NEW: Complete design system
│       └── components/
│           └── shared/
│               └── Breadcrumbs.tsx  # NEW: Breadcrumb navigation
```

---

## 🎨 Using The Design System

### Step 1: Import Design System

In any component or page, import the design system CSS:

```tsx
import "@/app/styles/design-system.css";
```

Or add it globally in `layout.tsx`:

```tsx
import "@/app/styles/design-system.css";
```

### Step 2: Use Design System Classes

**White Card Example**:
```tsx
<div className="ds-card">
  <div className="ds-card-body">
    <h2 className="ds-heading-3">Module Title</h2>
    <p className="ds-body">Module description goes here...</p>
    <button className="ds-btn ds-btn-primary">Start Learning</button>
  </div>
</div>
```

**Card with Accent Border**:
```tsx
<div className="ds-card ds-card-accent-purple ds-card-interactive">
  {/* Content */}
</div>
```

**Badge Example**:
```tsx
<span className="ds-badge ds-badge-lime">Easy</span>
<span className="ds-badge ds-badge-purple">Medium</span>
<span className="ds-badge ds-badge-blue">Hard</span>
```

### Step 3: Follow The Rules

**CRITICAL RULES**:
1. ✅ Cards MUST have white background (`ds-card` class)
2. ✅ Accent colors ONLY for: borders, icons, buttons, badges
3. ❌ NEVER use colored backgrounds on main content cards
4. ✅ Use CSS variables: `var(--space-md)`, `var(--text-primary)`, etc.
5. ✅ Maintain 8px grid spacing

---

## 📝 Creating New Modules (Content)

### SQL Insert Pattern

```sql
-- 1. Insert Module
INSERT INTO modules (title, description, difficulty, topic, estimated_minutes, thumbnail_url, is_recommended) 
VALUES (
  'Module Title',
  'Clear description for students',
  'easy',  -- or 'medium', 'hard'
  'topic_name',
  20,
  '/assets/images/modules/filename.jpg',
  FALSE
);

-- 2. Insert Sections (3-5 per module)
INSERT INTO module_sections (module_id, title, content, position) VALUES
(X, 'Section 1: Introduction', 'Content here...', 1),
(X, 'Section 2: Red Flags', 'Warning signs...', 2),
(X, 'Section 3: Examples', 'Real scenarios...', 3),
(X, 'Section 4: Protection', 'How to stay safe...', 4);

-- 3. Insert Resources
INSERT INTO resources (module_id, title, link_url, type) VALUES
(X, 'Official Source', 'https://example.gov.ph/', 'external_link');

-- 4. Create Quiz (if medium/hard)
INSERT INTO quizzes (module_id, title, description) VALUES
(X, 'Quiz Title', 'Test your knowledge...');

-- 5. Add Questions (mix types)
INSERT INTO questions (quiz_id, question_text, question_type, position) VALUES
(Y, 'Question text?', 'multiple_choice', 1);

-- 6. Add Answers
INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(Z, 'Wrong answer', FALSE),
(Z, 'Correct answer', TRUE);
```

### Content Writing Guidelines

**For High School Students**:
- Use simple, clear language
- Provide real-world examples from Philippines
- Include both English and Filipino context
- Make it engaging and relatable
- Focus on practical, actionable advice

**Module Structure**:
1. Introduction - What is this scam?
2. Red Flags - Warning signs to watch for
3. Examples - Real scenarios students might encounter
4. Verification - How to check if something is legitimate
5. Protection - What to do, where to report

**Topics Still Needed**:
- Free Prize/Giveaway Scams (3 modules)
- Impersonation Scams (3 modules)
- Crypto/NFT Scams (2 modules)
- Complete remaining for other topics

---

## 🏠 Redesigning the Homepage

### Current State
Located at: `/src/app/(logged-in)/home/page.tsx`

### What To Do

1. **Import Design System**:
```tsx
import "@/app/styles/design-system.css";
```

2. **Update Card Structure**:

Replace current colored box divs with:

```tsx
<div className="ds-grid ds-grid-2">
  {/* Learning Materials Card */}
  <Link href="/learning-modules" className="ds-card ds-card-interactive ds-card-accent-lime">
    <div className="ds-card-body">
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
        {/* Icon */}
        <div style={{ fontSize: '2rem' }}>📚</div>
        <div>
          <h2 className="ds-heading-3">Learning Materials</h2>
          <p className="ds-body-small">Interactive modules on scam identification</p>
        </div>
      </div>
    </div>
  </Link>

  {/* Similar for Quizzes, News, Support */}
</div>
```

3. **Add Recommended Section**:

```tsx
<section className="ds-section">
  <h2 className="ds-heading-2">Recommended For You</h2>
  
  <div className="ds-grid ds-grid-3">
    {/* Module Card */}
    <div className="ds-card ds-card-compact ds-card-interactive">
      <div className="ds-card-body">
        <span className="ds-badge ds-badge-lime">Easy</span>
        <h3 className="ds-heading-4" style={{ marginTop: 'var(--space-sm)' }}>
          Module Title
        </h3>
        <p className="ds-body-small">Brief description...</p>
      </div>
    </div>
    
    {/* Repeat for more modules */}
  </div>
</section>
```

4. **Update Styles**:
- Remove colored backgrounds from old CSS
- Use design system spacing variables
- Apply new card classes

---

## 🎓 Implementing Module Section

### Goal Layout

```
┌─────────────────────────────────────────────────────────┐
│ [Breadcrumbs]                                           │
├──────────┬──────────────────────────────────────────────┤
│          │                                              │
│  BADGES  │     FEATURED MODULE CARD                     │
│  PANEL   │     (Floating, white card)                   │
│          │                                              │
│  - Badge │     ┌──────────────────────────┐            │
│  - Badge │     │ Module Title             │            │
│  - Badge │     │ Description              │            │
│          │     │ [Start Learning Button]  │            │
│          │     └──────────────────────────┘            │
│          │                                              │
├──────────┴──────────────────────────────────────────────┤
│                                                         │
│  FILTERS: [All Topics ▼] [All Difficulties ▼] [Sort]   │
│                                                         │
│  ALL MODULES GRID:                                      │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐                  │
│  │ Module  │ │ Module  │ │ Module  │                  │
│  └─────────┘ └─────────┘ └─────────┘                  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Implementation Steps

1. **Create Layout Component** (`/src/app/(logged-in)/modules/page.tsx`):

```tsx
"use client";
import Breadcrumbs from "@/app/components/shared/Breadcrumbs";
import BadgesSidebar from "./components/BadgesSidebar";
import FeaturedModule from "./components/FeaturedModule";
import ModuleFilters from "./components/ModuleFilters";
import ModuleGrid from "./components/ModuleGrid";

export default function ModulesPage() {
  return (
    <>
      <Breadcrumbs />
      <div className="ds-container" style={{ display: 'flex', gap: 'var(--space-xl)' }}>
        {/* Left Sidebar - Badges */}
        <aside style={{ width: '280px', flexShrink: 0 }}>
          <BadgesSidebar />
        </aside>
        
        {/* Main Content */}
        <main style={{ flex: 1 }}>
          <FeaturedModule />
          <ModuleFilters />
          <ModuleGrid />
        </main>
      </div>
    </>
  );
}
```

2. **Create Badges Sidebar Component**:

```tsx
// /src/app/(logged-in)/modules/components/BadgesSidebar.tsx
"use client";
import { useEffect, useState } from "react";

export default function BadgesSidebar() {
  const [badges, setBadges] = useState([]);
  
  // Fetch user badges from API
  
  return (
    <div className="ds-card" style={{ position: 'sticky', top: 'var(--space-xl)' }}>
      <div className="ds-card-header">
        <h3 className="ds-heading-4">Your Badges</h3>
      </div>
      <div className="ds-card-body">
        {/* Badge display grid */}
      </div>
    </div>
  );
}
```

3. **Style with Design System**:
- Use `ds-card` for all containers
- Use `ds-badge` for difficulty levels
- Use `ds-btn-primary` for action buttons
- Use spacing variables consistently

---

## 🎮 Implementing Pin Game

### Database Structure

Pin game questions store coordinates in database:

```sql
CREATE TABLE questions (
  -- ... other fields
  question_type TEXT,      -- 'pin_game'
  image_url TEXT,          -- '/assets/images/pin-game/fake-ad-1.jpg'
  pin_x_coordinate INTEGER, -- X position (pixels from left)
  pin_y_coordinate INTEGER, -- Y position (pixels from top)
  pin_tolerance INTEGER     -- Acceptable distance in pixels (default: 50)
);
```

### Frontend Implementation

```tsx
// PinGame.tsx
"use client";
import { useState } from "react";

export default function PinGame({ question, onAnswer }) {
  const [clickPosition, setClickPosition] = useState(null);
  
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setClickPosition({ x, y });
    
    // Calculate if click is within tolerance
    const distance = Math.sqrt(
      Math.pow(x - question.pin_x_coordinate, 2) + 
      Math.pow(y - question.pin_y_coordinate, 2)
    );
    
    const isCorrect = distance <= question.pin_tolerance;
    onAnswer(isCorrect);
  };
  
  return (
    <div className="ds-card">
      <div className="ds-card-body">
        <p className="ds-body">{question.question_text}</p>
        <div style={{ position: 'relative', cursor: 'crosshair' }}>
          <img 
            src={question.image_url} 
            alt="Click to identify fake elements"
            onClick={handleImageClick}
            style={{ maxWidth: '100%', display: 'block' }}
          />
          {clickPosition && (
            <div 
              style={{
                position: 'absolute',
                left: clickPosition.x,
                top: clickPosition.y,
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: '3px solid var(--accent-lime)',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none'
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
```

### Admin Interface for Pin Game

Create: `/src/app/(logged-in)/admin/pin-game-admin/page.tsx`

```tsx
"use client";
import { useState } from "react";

export default function PinGameAdmin() {
  const [imageUrl, setImageUrl] = useState("");
  const [pinPosition, setPinPosition] = useState(null);
  const [tolerance, setTolerance] = useState(50);
  
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setPinPosition({ x, y });
  };
  
  const handleSave = () => {
    // Save to database via API
    const data = {
      image_url: imageUrl,
      pin_x_coordinate: pinPosition.x,
      pin_y_coordinate: pinPosition.y,
      pin_tolerance: tolerance
    };
    // POST to /api/questions
  };
  
  return (
    <div className="ds-container ds-section">
      <h1 className="ds-heading-1">Pin Game Admin</h1>
      
      <div className="ds-card" style={{ marginTop: 'var(--space-xl)' }}>
        <div className="ds-card-body">
          <div className="ds-form-group">
            <label className="ds-label">Image URL</label>
            <input 
              type="text"
              className="ds-input"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/assets/images/pin-game/example.jpg"
            />
          </div>
          
          <div className="ds-form-group">
            <label className="ds-label">Tolerance (pixels)</label>
            <input 
              type="number"
              className="ds-input"
              value={tolerance}
              onChange={(e) => setTolerance(Number(e.target.value))}
            />
          </div>
          
          {imageUrl && (
            <>
              <label className="ds-label">Click on the suspicious element:</label>
              <div style={{ position: 'relative', marginTop: 'var(--space-md)' }}>
                <img 
                  src={imageUrl}
                  alt="Set pin location"
                  onClick={handleImageClick}
                  style={{ maxWidth: '100%', cursor: 'crosshair' }}
                />
                {pinPosition && (
                  <>
                    {/* Pin marker */}
                    <div style={{
                      position: 'absolute',
                      left: pinPosition.x,
                      top: pinPosition.y,
                      width: '10px',
                      height: '10px',
                      backgroundColor: 'var(--accent-purple)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      zIndex: 10
                    }} />
                    {/* Tolerance circle */}
                    <div style={{
                      position: 'absolute',
                      left: pinPosition.x,
                      top: pinPosition.y,
                      width: tolerance * 2,
                      height: tolerance * 2,
                      border: '2px dashed var(--accent-purple)',
                      borderRadius: '50%',
                      transform: 'translate(-50%, -50%)',
                      pointerEvents: 'none',
                      opacity: 0.5
                    }} />
                  </>
                )}
              </div>
              
              {pinPosition && (
                <div style={{ marginTop: 'var(--space-md)' }}>
                  <p className="ds-body-small">
                    Pin Position: X={pinPosition.x}, Y={pinPosition.y}
                  </p>
                  <button 
                    className="ds-btn ds-btn-primary"
                    onClick={handleSave}
                    style={{ marginTop: 'var(--space-md)' }}
                  >
                    Save Pin Location
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

---

## 🤖 Chatbot Integration (Future)

### Options to Consider

1. **OpenAI API** (Easiest, requires API key)
   ```bash
   npm install openai
   ```

2. **Custom RAG with Module Content** (Most relevant)
   - Index all module content
   - Use vector embeddings
   - Query based on user questions

3. **Decision Tree System** (Free, limited)
   - Pre-programmed responses
   - Pattern matching
   - No AI needed

### Recommended Approach

Use OpenAI with context from modules:

```tsx
// Chatbot component
const handleMessage = async (userMessage) => {
  const response = await fetch('/api/chatbot', {
    method: 'POST',
    body: JSON.stringify({ 
      message: userMessage,
      context: currentModule // Pass current module for context
    })
  });
  
  const data = await response.json();
  return data.reply;
};
```

```typescript
// /api/chatbot/route.ts
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request) {
  const { message, context } = await request.json();
  
  const systemPrompt = `You are a helpful assistant for SiftHR, 
  an e-learning platform teaching Filipino high school students 
  about social media scams. Be friendly, clear, and provide 
  actionable advice. Context: ${context}`;
  
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message }
    ]
  });
  
  return Response.json({ reply: completion.choices[0].message.content });
}
```

---

## 🌐 Internationalization (i18n)

### Setup

1. Install next-intl:
```bash
npm install next-intl
```

2. Create translation files:

`/src/app/lib/i18n/en.json`:
```json
{
  "nav": {
    "home": "Home",
    "modules": "Learning Modules",
    "quizzes": "Quizzes",
    "news": "Latest News",
    "support": "Support"
  },
  "modules": {
    "easy": "Easy",
    "medium": "Medium",
    "hard": "Hard",
    "startLearning": "Start Learning"
  }
}
```

`/src/app/lib/i18n/tl.json`:
```json
{
  "nav": {
    "home": "Home",
    "modules": "Mga Modyul",
    "quizzes": "Mga Pagsusulit",
    "news": "Balita",
    "support": "Suporta"
  },
  "modules": {
    "easy": "Madali",
    "medium": "Katamtaman",
    "hard": "Mahirap",
    "startLearning": "Magsimula ng Pag-aaral"
  }
}
```

3. Use in components:
```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('modules');
  
  return <span>{t('easy')}</span>;
}
```

---

## 🧪 Testing Checklist

Before deploying:

- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Test mobile responsiveness (360px to 1920px)
- [ ] Test dark mode toggle
- [ ] Test all module content displays correctly
- [ ] Test quiz submissions and scoring
- [ ] Test pin game accuracy calculation
- [ ] Test breadcrumb navigation
- [ ] Test language switching
- [ ] Test chatbot responses
- [ ] Check accessibility (screen reader, keyboard nav)
- [ ] Performance audit (Lighthouse score > 90)

---

## 📞 Need Help?

Reference documents:
1. **REDESIGN_TRACKER.md** - Complete project overview
2. **design-system.css** - All available styles and classes
3. **content_inserts.sql** - Example module structure
4. **database.sql** - Database schema reference

Key principles:
- White/black cards ONLY
- Accents for borders, icons, buttons
- 8px grid spacing
- Student-friendly content
- Philippine context

---

**Good luck! The foundation is solid. Just keep following the design system rules and you'll create something great.**