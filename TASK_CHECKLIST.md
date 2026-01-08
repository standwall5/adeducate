# SiftHR Redesign - Task Checklist

**Branch**: `redesign-2025`  
**Last Updated**: January 2025  
**Use This**: Daily task tracking and progress monitoring

---

## 🎯 Quick Start Tasks (Do These First)

### Task 1: Apply Design System Globally ⏱️ 30 min
- [ ] Open `/src/app/layout.tsx`
- [ ] Add import: `import "@/app/styles/design-system.css";`
- [ ] Test that design system classes work site-wide

### Task 2: Replace Homepage ⏱️ 2 hours
- [ ] Backup current file: copy `/src/app/(logged-in)/home/page.tsx` to `/backup_old/`
- [ ] Replace with `/src/app/(logged-in)/home/page_redesigned.tsx`
- [ ] Rename `page_redesigned.tsx` to `page.tsx`
- [ ] Update API endpoints to fetch recommended content
- [ ] Test all links work
- [ ] Test responsive design on mobile

### Task 3: Update Database ⏱️ 15 min
- [ ] Run `/sql/schema_updates.sql` on your Supabase database
- [ ] Run `/sql/content_inserts.sql` to add 8 modules
- [ ] Verify modules appear in database
- [ ] Check badge system is populated

---

## 📝 Content Creation Tasks

### Complete Remaining Modules (16 needed)

#### Topic: Free Prize/Giveaway Scams
- [ ] Module: "Spotting Fake Giveaways" (Easy) - Add to `/sql/content_inserts.sql`
- [ ] Module: "Advanced Giveaway Fraud Detection" (Medium) + Quiz
- [ ] Module: "Expert Analysis of Prize Scams" (Hard) + Quiz

#### Topic: Impersonation Scams  
- [ ] Module: "Recognizing Fake Accounts" (Easy)
- [ ] Module: "Celebrity & Brand Impersonation" (Medium) + Quiz
- [ ] Module: "Sophisticated Identity Theft" (Hard) + Quiz

#### Topic: Crypto/NFT Scams
- [ ] Module: "Crypto Scam Basics" (Medium) + Quiz
- [ ] Module: "Advanced Blockchain Fraud" (Hard) + Quiz

#### Complete Existing Topics
- [ ] Module: "Fake Products - Expert Level" (Hard) + Quiz
- [ ] Module: "Phishing - Intermediate" (Medium) + Quiz
- [ ] Module: "Phishing - Advanced" (Hard) + Quiz
- [ ] Module: "Romance Scams" (Medium) + Quiz
- [ ] Module: "Investment Scams - Advanced" (Hard) + Quiz
- [ ] Module: "Job Scams - Intermediate" (Medium) + Quiz
- [ ] Module: "Job Scams - Advanced" (Hard) + Quiz

### Pin Game Images Needed
- [ ] Create/source 20+ fake ad images
- [ ] Save to `/public/assets/images/pin-game/`
- [ ] Set correct coordinates for each in database
- [ ] Test accuracy of tolerance zones

---

## 🎨 Component Development Tasks

### Create: `/src/app/components/shared/` 

#### Navbar Component ⏱️ 3 hours
- [ ] File: `Navbar.tsx`
- [ ] Redesign with formal styling
- [ ] Add dark mode toggle
- [ ] Add language switcher dropdown
- [ ] Make responsive (hamburger menu on mobile)
- [ ] Use design system classes

#### Chatbot Component ⏱️ 6 hours
- [ ] File: `Chatbot.tsx`
- [ ] Floating chat button (bottom right)
- [ ] Chat window overlay
- [ ] Message bubbles (user vs bot)
- [ ] Connect to `/api/chatbot` endpoint
- [ ] Add typing indicator
- [ ] Support English and Tagalog

#### Language Switcher ⏱️ 2 hours
- [ ] File: `LanguageSwitch.tsx`
- [ ] Dropdown with EN and TL flags
- [ ] Save preference to database
- [ ] Update page content on change

---

### Create: `/src/app/(logged-in)/modules/components/`

#### BadgesSidebar Component ⏱️ 3 hours
- [ ] File: `BadgesSidebar.tsx`
- [ ] Fetch user badges from API
- [ ] Display earned badges with icons
- [ ] Show locked badges (grayed out)
- [ ] Progress bar for next badge
- [ ] Make sticky on scroll
- [ ] Collapse on mobile

#### FeaturedModule Component ⏱️ 2 hours
- [ ] File: `FeaturedModule.tsx`
- [ ] Large card showcasing one module
- [ ] Display difficulty badge
- [ ] Show estimated time
- [ ] "Start Learning" button
- [ ] Rotate featured module daily

#### ModuleFilters Component ⏱️ 4 hours
- [ ] File: `ModuleFilters.tsx`
- [ ] Topic dropdown (all topics)
- [ ] Difficulty dropdown (easy/medium/hard)
- [ ] Sort by: newest, popular, difficulty
- [ ] Search bar integration
- [ ] Filter state management

#### ModuleGrid Component ⏱️ 3 hours
- [ ] File: `ModuleGrid.tsx`
- [ ] Grid of module cards
- [ ] Apply filters from ModuleFilters
- [ ] Pagination (load more)
- [ ] Loading skeleton states
- [ ] Empty state if no results

#### ModuleCard Component ⏱️ 2 hours
- [ ] File: `ModuleCard.tsx`
- [ ] White card with accent border
- [ ] Difficulty badge
- [ ] Topic tag
- [ ] Time estimate
- [ ] Progress indicator (if started)
- [ ] Hover animation

---

### Create: `/src/app/(logged-in)/quizzes/components/`

#### MultipleChoice Component ⏱️ 2 hours
- [ ] File: `MultipleChoice.tsx`
- [ ] Radio button options
- [ ] Highlight selected answer
- [ ] Show correct/incorrect after submit
- [ ] Explanation text for answer

#### CheckboxQuestion Component ⏱️ 2 hours
- [ ] File: `CheckboxQuestion.tsx`
- [ ] Multiple checkbox options
- [ ] Allow multiple selections
- [ ] Validate all correct answers selected
- [ ] Visual feedback

#### InputQuestion Component ⏱️ 2 hours
- [ ] File: `InputQuestion.tsx`
- [ ] Text input field
- [ ] Case-insensitive matching
- [ ] Trim whitespace
- [ ] Show correct answer if wrong

#### PinGame Component ⏱️ 4 hours
- [ ] File: `PinGame.tsx`
- [ ] Display image
- [ ] Click to place pin
- [ ] Calculate distance from correct position
- [ ] Visual tolerance circle
- [ ] Success/failure feedback
- [ ] Allow retry

---

### Create: `/src/app/(logged-in)/admin/pin-game-admin/`

#### Pin Game Admin Interface ⏱️ 6 hours
- [ ] File: `page.tsx`
- [ ] Image upload or URL input
- [ ] Display image preview
- [ ] Click to set pin position
- [ ] Visual marker on click
- [ ] Tolerance radius slider
- [ ] Show coordinates (x, y)
- [ ] Save to database button
- [ ] List existing pin game questions
- [ ] Edit existing pins

---

### Update: `/src/app/(logged-in)/modules/`

#### Modules Page Layout ⏱️ 4 hours
- [ ] File: `page.tsx`
- [ ] Import Breadcrumbs component
- [ ] Two-column layout (sidebar + main)
- [ ] BadgesSidebar on left (280px)
- [ ] Main content on right (flex)
- [ ] FeaturedModule at top
- [ ] ModuleFilters below
- [ ] ModuleGrid at bottom
- [ ] Make responsive

---

## 🌐 API Endpoints to Create/Update

### `/src/app/api/getModules/route.ts`
- [ ] Add query param: `?recommended=true`
- [ ] Add query param: `?difficulty=easy`
- [ ] Add query param: `?topic=scholarship_scams`
- [ ] Add query param: `?limit=10`
- [ ] Return modules with all new fields

### `/src/app/api/getQuizzes/route.ts`
- [ ] Add query param: `?recommended=true`
- [ ] Add query param: `?limit=10`
- [ ] Return quizzes with new fields

### `/src/app/api/getUserBadges/route.ts` (NEW)
- [ ] Create this endpoint
- [ ] Fetch user's earned badges
- [ ] Include badge metadata (icon, name, description)
- [ ] Calculate progress to next badge

### `/src/app/api/chatbot/route.ts` (NEW)
- [ ] Create this endpoint
- [ ] Accept message and context
- [ ] Call OpenAI API (or alternative)
- [ ] Return chatbot response
- [ ] Log conversation to database
- [ ] Support English and Tagalog

### `/src/app/api/submitPinGame/route.ts` (NEW)
- [ ] Create this endpoint
- [ ] Accept user click coordinates
- [ ] Fetch correct pin position
- [ ] Calculate distance
- [ ] Return correct/incorrect
- [ ] Award points if correct

---

## 🌍 Internationalization (i18n) Tasks

### Setup ⏱️ 2 hours
- [ ] Install: `npm install next-intl`
- [ ] Configure in `next.config.ts`
- [ ] Create `/src/app/lib/i18n/` directory
- [ ] Set up language routing

### Translation Files ⏱️ 8 hours
- [ ] Create: `/src/app/lib/i18n/en.json`
- [ ] Create: `/src/app/lib/i18n/tl.json`
- [ ] Translate navigation labels
- [ ] Translate button text
- [ ] Translate form labels
- [ ] Translate error messages
- [ ] Translate module UI text (not content)

### Implement in Components ⏱️ 4 hours
- [ ] Update Navbar with translations
- [ ] Update homepage with translations
- [ ] Update module pages with translations
- [ ] Update quiz pages with translations
- [ ] Test language switching

---

## 🎮 NextStep.js Walkthrough Tasks

### Create Tour Definitions ⏱️ 6 hours
- [ ] File: `/src/app/lib/tours/firstVisit.ts`
- [ ] Define homepage tour steps
- [ ] Define module navigation tour
- [ ] Define quiz taking tour
- [ ] Define badge system tour
- [ ] Style tour tooltips with design system

### Implement Tours ⏱️ 3 hours
- [ ] Add tour triggers in components
- [ ] Track completion in database
- [ ] Add "Help" button to navbar
- [ ] Allow users to replay tours

---

## 📰 Latest News Redesign

### Update: `/src/app/(logged-in)/news/page.tsx` ⏱️ 6 hours
- [ ] Three-column layout
- [ ] Left: News feed (main articles)
- [ ] Top: Search bar
- [ ] Right: Recommended articles sidebar
- [ ] Apply design system styling
- [ ] Add filtering by category
- [ ] Implement pagination

### Components Needed
- [ ] File: `components/NewsCard.tsx`
- [ ] File: `components/NewsSearch.tsx`
- [ ] File: `components/RecommendedArticles.tsx`

---

## 🎥 Camera Detection Feature

### Complete Implementation ⏱️ 8 hours
- [ ] File: `/src/app/(logged-in)/camera-detection/page.tsx`
- [ ] Redesign UI with design system
- [ ] Phone screen detection model
- [ ] Fake ad detection within screen
- [ ] Accuracy percentage display
- [ ] Real-time processing
- [ ] User feedback form
- [ ] Log results to database

---

## 🧪 Testing Tasks

### Functionality Testing
- [ ] Test all modules load correctly
- [ ] Test quizzes submit and score properly
- [ ] Test pin game accuracy calculation
- [ ] Test badge awarding logic
- [ ] Test language switching
- [ ] Test dark mode toggle
- [ ] Test chatbot responses
- [ ] Test all API endpoints

### Responsive Testing
- [ ] Test on mobile (360px width)
- [ ] Test on tablet (768px width)
- [ ] Test on desktop (1920px width)
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome

### Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Accessibility Testing
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast (WCAG AA)
- [ ] Focus indicators
- [ ] Alt text on images

---

## 📊 Performance Optimization

- [ ] Run Lighthouse audit
- [ ] Optimize images (use Next.js Image)
- [ ] Lazy load components
- [ ] Implement route prefetching
- [ ] Minimize bundle size
- [ ] Add loading skeletons
- [ ] Cache API responses
- [ ] Optimize database queries

---

## 📄 Documentation Tasks

### Update README.md
- [ ] Add setup instructions
- [ ] Document environment variables
- [ ] Add database setup steps
- [ ] Include screenshot of new design
- [ ] Add contributing guidelines

### Create Admin Guide
- [ ] File: `/docs/ADMIN_GUIDE.md`
- [ ] How to add modules
- [ ] How to create pin games
- [ ] How to manage users
- [ ] How to view analytics

### Create Student Guide  
- [ ] File: `/docs/STUDENT_GUIDE.md`
- [ ] How to navigate the site
- [ ] How to complete modules
- [ ] How to take quizzes
- [ ] How to earn badges

---

## 🚀 Deployment Tasks

### Pre-Deployment
- [ ] Set all environment variables
- [ ] Run database migrations
- [ ] Test in production mode locally
- [ ] Check all external links work
- [ ] Verify API rate limits

### Deployment
- [ ] Deploy to Vercel/hosting
- [ ] Configure domain
- [ ] Set up SSL certificate
- [ ] Test production site
- [ ] Monitor error logs

### Post-Deployment
- [ ] Train teachers/admins
- [ ] Gather student feedback
- [ ] Monitor analytics
- [ ] Fix any bugs found
- [ ] Plan next iteration

---

## ✅ Progress Tracking

**Use this section to mark your daily progress:**

### Week 1
- [ ] Day 1: ________________
- [ ] Day 2: ________________
- [ ] Day 3: ________________
- [ ] Day 4: ________________
- [ ] Day 5: ________________

### Week 2
- [ ] Day 1: ________________
- [ ] Day 2: ________________
- [ ] Day 3: ________________
- [ ] Day 4: ________________
- [ ] Day 5: ________________

### Week 3
- [ ] Day 1: ________________
- [ ] Day 2: ________________
- [ ] Day 3: ________________
- [ ] Day 4: ________________
- [ ] Day 5: ________________

---

## 🎯 Milestone Goals

- [ ] **Milestone 1**: All content created (24 modules, 16+ quizzes)
- [ ] **Milestone 2**: Homepage and navigation complete
- [ ] **Milestone 3**: Module system fully functional
- [ ] **Milestone 4**: Quiz system with pin game working
- [ ] **Milestone 5**: Chatbot integrated
- [ ] **Milestone 6**: Full translation to Tagalog
- [ ] **Milestone 7**: All testing complete
- [ ] **Milestone 8**: Deployed to production

---

**Remember**: Check off tasks as you complete them. Update weekly progress. Refer to IMPLEMENTATION_GUIDE.md for code examples!