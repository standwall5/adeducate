-- ============================================================================
-- SiftHR Content Inserts - Learning Modules & Quizzes
-- ============================================================================
-- This file contains comprehensive educational content for identifying
-- fraudulent social media advertisements and online scams.
-- Target Audience: Santo Niño National High School students
-- Focus: Practical, actionable scam identification skills
-- ============================================================================

-- ============================================================================
-- TOPIC 1: ONLINE SCHOLARSHIP SCAMS
-- ============================================================================

-- Module 1.1: Online Scholarship Scams (Easy)
INSERT INTO modules (title, description, difficulty, topic, estimated_minutes, thumbnail_url, is_recommended) VALUES
('Spotting Fake Scholarship Offers',
 'Learn the basics of identifying fraudulent scholarship advertisements on social media. Perfect for students starting their scholarship search.',
 'easy',
 'scholarship_scams',
 15,
 '/assets/images/modules/scholarship-basic.jpg',
 TRUE);

-- Get the module ID (adjust based on your sequence)
-- For sections, we'll use module_id = 1 (adjust if needed)

INSERT INTO module_sections (module_id, title, content, position) VALUES
(1, 'What Are Scholarship Scams?',
 $$Scholarship scams are fraudulent offers that promise free money for education but are designed to steal your personal information or money. Scammers create fake scholarship opportunities on Facebook, Instagram, TikTok, and other platforms to target students who need financial help. These scams can look very real and professional, making them hard to identify.$$,
 1);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(1, 'Common Red Flags',
 $$Watch out for these warning signs:

• UPFRONT FEES: Real scholarships NEVER ask for application fees, processing fees, or disbursement fees
• GUARANTEED WINS: No legitimate scholarship can guarantee you will win before you apply
• PRESSURE TACTICS: "Apply now or lose this opportunity forever!" - Real scholarships have clear deadlines
• TOO GOOD TO BE TRUE: Promises of "everyone wins" or extremely large amounts with no requirements
• POOR GRAMMAR: Many fake posts have spelling mistakes and awkward sentences
• NO OFFICIAL WEBSITE: Cannot verify the organization exists outside of social media
• REQUESTS FOR BANK INFO: Never give your bank account, ATM PIN, or credit card details$$,
 2);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(1, 'Real Example Scenarios',
 $$FAKE EXAMPLE 1: A Facebook post says "100% Scholarship Grant! No requirements! Just pay 500 pesos processing fee! Message now!" - This is FAKE because real scholarships never charge fees.

FAKE EXAMPLE 2: An Instagram ad shows "You won our scholarship! Claim now by sending your bank details!" - This is FAKE because you cannot win without applying first.

REAL EXAMPLE: CHED (Commission on Higher Education) posts scholarship opportunities on their official verified Facebook page with clear application processes, requirements, and official website links.$$,
 3);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(1, 'How to Verify Scholarships',
 $$STEP 1: Check if the organization is real - Search for their official website (not just social media)
STEP 2: Look for the BLUE VERIFIED BADGE on social media accounts
STEP 3: Cross-reference with official government sites like CHED, DOST-SEI, or DepEd
STEP 4: Ask your school guidance counselor - they know legitimate scholarship programs
STEP 5: Check the organization's contact information - call official phone numbers listed on .gov.ph or .edu.ph websites$$,
 4);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(1, 'What To Do If Scammed',
 $$If you think you encountered a scholarship scam:

1. DO NOT send any money or personal information
2. Take screenshots of the fake advertisement
3. Report the post/page to the social media platform
4. Report to the NBI Cybercrime Division or PNP Anti-Cybercrime Group
5. Tell your parents, guardians, and school officials
6. Warn your classmates and friends

Remember: It is not your fault if you almost fell for a scam. These scammers are professionals at tricking people!$$,
 5);

-- Resources for Module 1.1
INSERT INTO resources (module_id, title, link_url, type) VALUES
(1, 'CHED Official Scholarship Programs', 'https://ched.gov.ph/scholarships/', 'external_link'),
(1, 'DOST-SEI Scholarship Information', 'https://www.sei.dost.gov.ph/', 'external_link'),
(1, 'How to Report Cybercrimes (PNP)', 'https://www.pnp.gov.ph/acg', 'external_link');

-- Module 1.2: Online Scholarship Scams (Medium)
INSERT INTO modules (title, description, difficulty, topic, estimated_minutes, thumbnail_url) VALUES
('Advanced Scholarship Scam Detection',
 'Deep dive into sophisticated scholarship scam tactics including fake organizations, impersonation, and phishing attempts.',
 'medium',
 'scholarship_scams',
 25,
 '/assets/images/modules/scholarship-advanced.jpg');

INSERT INTO module_sections (module_id, title, content, position) VALUES
(2, 'Sophisticated Scam Techniques',
 $$Advanced scammers create elaborate schemes that are harder to detect:

FAKE ORGANIZATIONS: Scammers create fake NGOs or foundations with professional-looking websites and social media pages. They may use names similar to real organizations (example: "Philippine Education Fund" vs real "Philippine Educational Foundation").

IMPERSONATION: Scammers pretend to be from CHED, DepEd, or legitimate foundations. They use stolen logos and fake official-looking documents.

PHISHING LINKS: Ads contain links that look official but lead to fake websites designed to steal your information. Example: "ched-scholarship.com" instead of real "ched.gov.ph".

FAKE TESTIMONIALS: Posted pictures and videos of supposed "winners" who are actually paid actors or stolen photos from other people.$$,
 1);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(2, 'Verifying Digital Authenticity',
 $$How to check if online content is legitimate:

WEBSITE URL VERIFICATION:
• Real government sites end in .gov.ph
• Real schools end in .edu.ph
• Be suspicious of .com, .net, or unusual domains

SOCIAL MEDIA VERIFICATION:
• Blue check mark = verified account (but can also be faked in images)
• Check follower count and engagement (real organizations have thousands)
• Look at post history - real organizations post regularly, not just scholarship ads
• Check when account was created - be suspicious of very new accounts

DOCUMENT VERIFICATION:
• Official documents have specific formats and security features
• Check for official seals and signatures
• Contact the issuing office directly to verify document numbers$$,
 2);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(2, 'Social Engineering Tactics',
 $$Scammers use psychological tricks to manipulate victims:

URGENCY: "Only 10 slots left! Apply in 24 hours!" - Creates panic so you do not think clearly
AUTHORITY: Using logos, official-looking uniforms in photos, formal language
RECIPROCITY: "We helped 1000 students, now help us by sharing this post"
SOCIAL PROOF: "Your classmate already applied!" or showing fake high engagement numbers
SCARCITY: "Limited time offer" or "Exclusive for your school only"

These tactics are designed to make you act quickly without thinking critically.$$,
 3);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(2, 'Protecting Your Personal Information',
 $$What information to NEVER share online:

CRITICAL DATA (Never share):
• Full name with birth date
• Student ID number
• Home address
• Phone number
• Email address (on public posts)
• Bank account details
• ATM PIN or passwords
• Photos of ID cards
• Family information

SAFE TO SHARE:
• General location (city/province only)
• School name (but not grade/section)
• General interests for scholarship matching

Remember: Legitimate scholarship applications happen through official portals, not Facebook Messenger or Instagram DMs!$$,
 4);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(2, 'Case Studies',
 $$CASE 1: THE FAKE CHED SCHOLARSHIP (2023)
Scammers created a Facebook page "CHED Scholarship Grant 2023" with stolen CHED logo. They posted that students could get 50,000 pesos by paying 800 pesos "processing fee". Over 200 students were scammed before the page was reported. The real CHED announced they never charge fees.

CASE 2: THE PHISHING WEBSITE
A scholarship ad on Facebook linked to "ched-scholarship.com" that looked exactly like the real CHED website. Students who entered their information had their emails hacked and bank accounts compromised.

LESSON: Always verify URLs and go directly to official websites, never through social media links.$$,
 5);

INSERT INTO resources (module_id, title, link_url, type) VALUES
(2, 'Verify Government Websites', 'https://www.gov.ph/', 'external_link'),
(2, 'Report Fake Pages to Facebook', 'https://www.facebook.com/help/263149623790594', 'external_link');

-- Module 1.3: Online Scholarship Scams (Hard)
INSERT INTO modules (title, description, difficulty, topic, estimated_minutes, thumbnail_url) VALUES
('Expert Scholarship Fraud Analysis',
 'Master-level content covering organized scholarship fraud rings, data harvesting operations, and international scam networks.',
 'hard',
 'scholarship_scams',
 35,
 '/assets/images/modules/scholarship-expert.jpg');

INSERT INTO module_sections (module_id, title, content, position) VALUES
(3, 'Organized Scam Networks',
 $$Professional scam operations work differently from individual scammers:

MULTI-PLATFORM PRESENCE: Organized groups create presence across Facebook, Instagram, TikTok, Twitter, and Telegram. They cross-promote to appear legitimate.

LAYERED APPROACH: First contact seems helpful (free scholarship tips), then gradually introduces fake opportunities.

DATA HARVESTING: Primary goal is collecting large databases of student information to sell to other criminals or use in future scams.

SHELL COMPANIES: Register fake businesses or NGOs with DTI/SEC to appear in official databases.

CALL CENTERS: Some operations have actual call centers with scripts to convince victims they are legitimate.

MONEY LAUNDERING: Use "money mules" (often scam victims themselves) to transfer funds to avoid detection.$$,
 1);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(3, 'Digital Forensics - Spotting Fakes',
 $$Advanced verification techniques:

IMAGE ANALYSIS:
• Use reverse image search (Google Images) to check if photos are stolen
• Look for inconsistent shadows, lighting in edited images
• Check image metadata if possible (when photo was taken, camera used)

VIDEO VERIFICATION:
• Check if video audio matches lip movements (deepfakes)
• Look for unnatural movements or glitches
• Verify background details match claimed location

WEBSITE ANALYSIS:
• Check domain registration date (WHOIS lookup)
• Verify SSL certificate legitimacy
• Look for copied content from real sites
• Check contact information matches official sources

SOCIAL MEDIA FORENSICS:
• Analyze posting patterns (bots post at regular intervals)
• Check follower quality (many fake followers = suspicious)
• Review comment authenticity (generic comments may be bots)
• Examine account creation date and evolution$$,
 2);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(3, 'Legal Framework and Reporting',
 $$Understanding cybercrime laws in the Philippines:

APPLICABLE LAWS:
• RA 10175 (Cybercrime Prevention Act of 2012) - punishes online fraud
• RA 8484 (Access Devices Regulation Act) - credit card/ATM fraud
• RA 10173 (Data Privacy Act of 2012) - illegal collection of personal data

PENALTIES:
• Online fraud: Imprisonment of 6 months to 12 years + fines
• Identity theft: Additional penalties
• Organizations can be held liable

WHERE TO REPORT:
1. NBI Cybercrime Division
   - Online: https://www.nbi.gov.ph/
   - Hotline: (02) 8525-4093

2. PNP Anti-Cybercrime Group
   - Email: acg@pnp.gov.ph
   - Hotline: (02) 8723-0401 local 7491

3. DICT Cybersecurity Bureau
   - Email: info@cybersecurity.gov.ph

WHAT TO INCLUDE IN REPORTS:
• Screenshots with dates/times
• URLs and account names
• Transaction records
• Communication logs
• How much money lost (if any)$$,
 3);

INSERT INTO module_sections (module_id, title, content, position) VALUES
(3, 'Creating a Personal Security Protocol',
 $$Develop your own system for evaluating opportunities:

VERIFICATION CHECKLIST:
☐ Is there an official .gov.ph or .edu.ph website?
☐ Can I find this organization on Google News?
☐ Does the social media account have verification badge?
☐ Are there reviews or mentions from credible sources?
☐ Have I contacted my school counselor to verify?
☐ Does the application process seem professional?
☐ Are they asking for any money or sensitive information?
☐ Can I find their physical office address?
☐ Do they have official contact numbers that work?
☐ Have I checked with CHED/DepEd/DOST if applicable?

PERSONAL RULES:
• Never decide immediately - take 24 hours to verify
• Always consult a trusted adult before sharing information
• Keep records of all scholarship interactions
• Trust your instincts - if something feels wrong, it probably is
• Remember: Missing a real scholarship is better than falling for a scam$$,
 4);

INSERT INTO resources (module_id, title, link_url, type) VALUES
(3, 'NBI Cybercrime Division', 'https://www.nbi.gov.ph/', 'external_link'),
(3, 'Cybercrime Prevention Act Full Text', 'https://www.officialgazette.gov.ph/2012/09/12/republic-act-no-10175/', 'external_link'),
(3, 'DICT Cybersecurity Resources', 'https://dict.gov.ph/cybersecurity/', 'external_link');

-- ============================================================================
-- QUIZZES FOR SCHOLARSHIP SCAMS
-- ============================================================================

-- Quiz for Module 1 (Easy)
INSERT INTO quizzes (module_id, title, description) VALUES
(1, 'Scholarship Scam Basics Quiz',
 'Test your knowledge on identifying basic scholarship scam red flags. 5 questions covering the fundamentals.');

INSERT INTO questions (quiz_id, question_text, question_type, position) VALUES
(1, 'A Facebook post offers a "guaranteed scholarship" but asks for a 500 peso processing fee. Is this legitimate?',
 'multiple_choice', 1);

INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(1, 'Yes, small processing fees are normal for scholarships', FALSE),
(1, 'No, legitimate scholarships never charge application fees', TRUE),
(1, 'Maybe, depends on the organization', FALSE),
(1, 'Yes, if they promise to return the money', FALSE);

INSERT INTO questions (quiz_id, question_text, question_type, position) VALUES
(1, 'Which of these are red flags for scholarship scams? (Select all that apply)',
 'checkbox', 2);

INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(2, 'Asking for your bank account details', TRUE),
(2, 'Having an official .gov.ph website', FALSE),
(2, 'Guaranteed approval for everyone', TRUE),
(2, 'Poor grammar and spelling errors', TRUE),
(2, 'Clear application deadlines and requirements', FALSE);

INSERT INTO questions (quiz_id, question_text, question_type, correct_answer, position) VALUES
(1, 'What government website extension indicates an official Philippine government site?',
 'input', '.gov.ph', 3);

INSERT INTO questions (quiz_id, question_text, question_type, position, image_url, pin_x_coordinate, pin_y_coordinate, pin_tolerance) VALUES
(1, 'Click on the MOST suspicious element in this fake scholarship ad.',
 'pin_game', 4, '/assets/images/pin-game/fake-scholarship-1.jpg', 450, 320, 60);

INSERT INTO questions (quiz_id, question_text, question_type, position) VALUES
(1, 'What should you do FIRST if you encounter a suspicious scholarship offer?',
 'multiple_choice', 5);

INSERT INTO answers (question_id, answer_text, is_correct) VALUES
(9, 'Share it with friends to warn them', FALSE),
(9, 'Apply quickly before slots run out', FALSE),
(9, 'Verify with your school counselor or official sources', TRUE),
(9, 'Send your information to test if it is real', FALSE);

-- ============================================================================
-- BADGES FOR GAMIFICATION
-- ============================================================================

INSERT INTO badges (name, description, badge_type, icon_url, requirement_value) VALUES
('First Steps', 'Complete your first module', 'module_completion', '/assets/badges/first-steps.svg', 1),
('Scholar Seeker', 'Complete all scholarship scam modules', 'topic_completion', '/assets/badges/scholar-seeker.svg', 3),
('Sharp Shopper', 'Complete all fake product modules', 'topic_completion', '/assets/badges/sharp-shopper.svg', 3),
('Quiz Master', 'Score 100% on any quiz', 'quiz_perfection', '/assets/badges/quiz-master.svg', 1),
('Consistent Learner', 'Maintain a 7-day learning streak', 'streak', '/assets/badges/consistent-learner.svg', 7),
('Scam Detective', 'Complete 10 modules across different topics', 'module_completion', '/assets/badges/scam-detective.svg', 10),
('Expert Identifier', 'Complete all hard difficulty modules', 'difficulty_completion', '/assets/badges/expert-identifier.svg', 8),
('Quiz Champion', 'Complete 10 quizzes', 'quiz_completion', '/assets/badges/quiz-champion.svg', 10),
('Pin Master', 'Correctly identify all pins in 5 pin game questions', 'pin_game_success', '/assets/badges/pin-master.svg', 5),
('Community Guardian', 'Report 3 fake ads or scams', 'reporting', '/assets/badges/community-guardian.svg', 3);

-- ============================================================================
-- MILESTONES
-- ============================================================================

INSERT INTO milestones (name, description, requirement_type, requirement_value, badge_id) VALUES
('Complete First Module', 'Finish your first learning module on any topic', 'modules_completed', 1, 1),
('Scholarship Expert', 'Master all scholarship scam detection skills', 'topic_modules_completed', 3, 2),
('Product Fraud Fighter', 'Learn to identify all types of fake product scams', 'topic_modules_completed', 3, 3),
('Perfect Score', 'Achieve 100% score on any quiz', 'perfect_quiz', 1, 4),
('Week Warrior', 'Study every day for 7 consecutive days', 'daily_streak', 7, 5),
('Knowledge Hunter', 'Complete 10 different modules', 'modules_completed', 10, 6),
('Difficulty Master', 'Complete all hard-level content', 'hard_modules_completed', 8, 7),
('Quiz Enthusiast', 'Take and complete 10 quizzes', 'quizzes_completed', 10, 8),
('Pin Point Accuracy', 'Successfully complete 5 pin game challenges', 'pin_games_correct', 5, 9),
('Community Hero', 'Help protect others by reporting scams', 'scams_reported', 3, 10);

-- ============================================================================
-- NOTES FOR IMPLEMENTATION
-- ============================================================================

-- This SQL file provides comprehensive educational content for:
-- - 3 complete learning modules (scholarship scams: easy, medium, hard)
-- - 1 comprehensive quiz with mixed question types
-- - 10 badges and 10 milestones for gamification
-- - Resources linking to legitimate Philippine government sources

-- IMPORTANT:
-- - Module IDs may need adjustment based on your sequence
-- - Image paths are placeholders - actual images need to be created
-- - Pin game coordinates are estimates - adjust based on actual images
-- - This is a STARTER SET - more modules need to be added for other topics
-- - Tagalog translations should be added in separate i18n files

-- TO COMPLETE THIS CONTENT SET:
-- Add remaining modules for other topics (see REDESIGN_TRACKER.md):
-- - Fake Product Advertisements (medium, hard)
-- - Phishing & Account Takeovers (medium, hard)
-- - Investment & Romance Scams (easy, hard)
-- - Job Offer Scams (medium, hard)
-- - Free Prize/Giveaway Scams (3 modules)
-- - Impersonation Scams (3 modules)
-- - Crypto/NFT Scams (2 modules)

-- All content is based on real scam tactics used in the Philippines
-- and aligned with government cybersecurity education initiatives.
