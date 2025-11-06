# City of Threads - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing inspiration from successful browser-based strategy games (Clash of Clans progression model, Forge of Empires UI clarity, Travian's information density) combined with modern web app UX patterns for the UGC creation tools.

**Core Principles**:
- Game-first interface with clear information hierarchy for rapid decision-making
- Dual-mode design: Strategic city view (spacious, visual) vs Management panels (dense, functional)
- Mobile-optimized touch targets and gesture controls
- Playful yet professional aesthetic that scales from casual to power users

## Typography System

**Font Families** (Google Fonts):
- Primary: **Inter** (UI, stats, numbers) - weights 400, 500, 600, 700
- Display: **Outfit** (headings, town names, achievements) - weights 600, 700, 800

**Type Scale**:
- Hero/Town Names: text-4xl to text-6xl (Outfit bold)
- Section Headers: text-2xl to text-3xl (Outfit semibold)
- Panel Titles: text-lg to text-xl (Inter semibold)
- Body/Stats: text-sm to text-base (Inter regular)
- Fine Print/Timestamps: text-xs (Inter medium)

## Layout System

**Spacing Primitives**: Use Tailwind units of **2, 3, 4, 6, 8, 12, 16** for consistent rhythm.
- Tight spacing (p-2, gap-2): Dense info panels, item grids
- Standard spacing (p-4, gap-4): Card interiors, form elements
- Generous spacing (p-8, p-12): Panel headers, section breaks
- Extra spacing (p-16): Main content containers

**Grid System**:
- City Map: Full-screen viewport with floating UI panels
- Management Views: Sidebar (280-320px) + Main content area
- Item Grids: grid-cols-2 (mobile) → grid-cols-4 (tablet) → grid-cols-6 (desktop)
- Dashboard: 2-column responsive layout for metrics cards

**Container Strategy**:
- Game Canvas: Full viewport w-full h-screen
- Floating Panels: Fixed widths (320px, 400px, 600px) with max-h-[80vh] overflow-scroll
- Modal Dialogs: max-w-2xl to max-w-4xl centered
- Mobile: Full-width panels slide from bottom

## Component Library

### Navigation & Chrome

**Top Bar** (h-16, fixed):
- Left: Town name + TL badge
- Center: Resources display (Coins, Credits) with animated counters
- Right: Settings, notifications (bell icon with badge), user avatar
- Background: Semi-transparent blur backdrop-blur-md
- Shadow: shadow-lg for depth

**Tab Navigation** (Game Modes):
- Horizontal pills on desktop, bottom tab bar on mobile
- Icons + labels: City Map, Shop, Arcade, Puzzles, Governance, Profile
- Active state: solid background, inactive: ghost buttons
- Icon library: Heroicons

### City Map Interface

**Main Canvas**:
- 2D isometric or top-down view
- Zoom controls (bottom-right corner)
- Minimap (top-right, 120px square)
- Floating action button (bottom-right): "Build Mode" toggle

**Building Cards** (on tap/click):
- Compact popover (max-w-sm)
- Building icon/image at top
- Title, level, stats in structured rows
- Action buttons: Upgrade, Collect, Manage
- Progress bars for timers

### Shop System

**Item Grid**:
- Card-based layout with hover lift effect
- Each card: Image (square aspect), Name, Price, Stock indicator
- Buy/Sell toggle at top
- Filters: Category tabs, Sort dropdown
- Price trend indicators (↑↓ arrows with percentage)

**Transaction Panel**:
- Modal overlay with quantity selector
- Preview: Item + Total cost calculation
- Confirm/Cancel buttons (prominent primary vs ghost)
- Success animation: coins flying to resource counter

### Microgame Editor

**Template Selector**:
- Large cards (grid-cols-1 md:grid-cols-3)
- Preview GIF/image, title, difficulty badge
- "Start with Template" button
- Quick stats: avg playtime, popularity

**Editor Canvas**:
- Split view: Preview (left 60%) + Properties panel (right 40%)
- Toolbar: Icon buttons for common actions (undo, redo, test, publish)
- Property inspector: Grouped accordions for settings
- Bottom bar: Save draft, Preview, Publish workflow

**Share Modal**:
- Generated embed code in code block (copy button)
- Direct link with QR code
- Social share buttons
- Analytics preview (plays count)

### Spatial Puzzle Tool

**Placement Mode**:
- Grid overlay on city map
- Draggable puzzle pieces from palette (left sidebar)
- Snap-to-grid behavior
- Rotation controls
- Save/Discard buttons in floating toolbar

**Puzzle Browser**:
- List view with thumbnails
- Difficulty stars, completion rate, creator name
- "Attempt" button for each
- Filter by difficulty, neighborhood

### Governance UI

**StoryNet Voting**:
- Daily proposition card (prominent, centered)
- Visual comparison: Current vs Proposed parameter
- Impact preview: Simple chart showing economic effect
- Vote buttons: Approve/Reject (equal visual weight)
- Results bar chart after voting closes
- Countdown timer to next vote

**Mayor Dashboard**:
- Profile card: Mayor + Vice-Mayors with portraits
- Policy proposals list (chronological feed)
- Ledger table: Date, Action, Impact columns
- "Propose Policy" button (primary, top-right)

**Election Modal**:
- Candidate cards in grid
- Each: Portrait, platform summary, endorsement count
- Vote button per candidate
- Live results bar during election

### Heist Planning

**Phase 1 - Planning**:
- Top-down blueprint view of target
- Waypoint placement: Click to add checkpoints
- Partner selection: Avatar picker
- Timeline scrubber: Coordinate entry times (async)
- Equipment loadout: Item slots with drag-drop

**Phase 2 - Execution**:
- Minimal HUD: Stealth meter, timer, objectives checklist
- Simplified controls overlay (mobile: virtual joystick)
- Alert system: Visual indicators for detection
- Success/Fail overlay with rewards summary

### Dashboard & Telemetry

**Metrics Cards**:
- Grid layout (2-3 cols): Each card shows one KPI
- Large number (text-4xl), trend arrow, sparkline chart
- Color-coded borders (not fills) for status

**Charts**:
- Line charts: DAU, session length over time
- Bar charts: Microgame popularity, TL distribution
- Pie charts: Revenue breakdown, player activity types
- Library: Use Chart.js via CDN

### Progression & Monetization

**TL Upgrade Panel**:
- Hero section: Current TL badge (large) → Next TL preview
- Requirements checklist: Resources, buildings, time
- Progress bars for each requirement
- "Upgrade Now" button (disabled until ready)
- Premium option: "Speed Up" with Credits cost and time saved

**Shop (Cosmetics)**:
- Featured section: Seasonal pass banner at top
- Grid of items with "Premium" badges
- Preview modal: 3D model viewer or image carousel
- Clear labeling: "Cosmetic Only - No Gameplay Advantage"

**Purchase Modal**:
- Item preview (large image)
- Price in Credits with duration/effect clearly stated
- Legal text: "Non-refundable, cosmetic only"
- Payment button with confirmation step

### Moderation Interface

**Pre-publish Quarantine Banner**:
- Yellow info banner on new UGC
- Text: "Under review - Limited to 200 plays"
- Progress: "127/200 plays" with bar
- Status badges: Pending, Approved, Flagged

**Report Modal**:
- Radio buttons: Inappropriate, Exploit, Spam, Other
- Text area for details
- Evidence upload (optional)
- Submit button with confirmation

### Onboarding Tutorial

**Interactive Overlay**:
- Spotlight effect: Dim rest of screen, highlight active area
- Floating instruction bubble with arrow pointer
- Step counter: "2/7"
- Skip button (text link, subtle)
- Next/Back navigation

**First-Day Missions**:
- Persistent bottom drawer (collapsible)
- Quest list: Icon, title, reward, progress bar
- Celebratory animation on completion
- Reward claim button (pulsing if ready)

**Town Templates Modal**:
- Three columns: Starter, Balanced, Creator
- Each: Illustration, bullet points, recommended-for tag
- Select button becomes primary on hover
- "Choose Later" option at bottom

### Mobile Optimizations

- Bottom sheet pattern for all panels (slide up from bottom)
- Floating action button for primary actions (bottom-right)
- Swipe gestures: Close panels, navigate tabs
- Touch targets: min h-12 for all interactive elements
- Simplified views: Hide secondary info, show on tap

## Images Strategy

**Hero/Marketing**: Not applicable - this is an in-game interface, not a landing page

**In-Game Assets**:
- Building illustrations: Isometric pixel art or low-poly 3D renders
- Item icons: 64x64 to 128x128 flat icon style with subtle shadows
- Character portraits: Circular crops, 96x96 for UI
- Background tiles: Seamless patterns for city map
- Badge/Achievement icons: Colorful, recognizable silhouettes

**Placeholder Strategy**:
- Use icon libraries (Heroicons) for UI elements
- Generate simple geometric shapes for building placeholders
- SVG patterns for map textures
- Gradient placeholders for character portraits until assets load

## Accessibility Requirements

- Focus indicators on all interactive elements (ring-2 ring-offset-2)
- ARIA labels on icon-only buttons
- Keyboard navigation: Tab order follows visual hierarchy
- Screen reader announcements for async updates (timers, resource changes)
- Minimum 4.5:1 contrast for all text (will be ensured with color selection)
- Reduced motion support: Disable decorative animations when prefers-reduced-motion

## Animation Guidelines

**Use Sparingly**:
- Resource counters: Count-up animation on gain
- Progress bars: Smooth fill transitions
- Notifications: Slide-in from top-right
- Modals: Fade in + scale from 95% to 100%
- Success states: Single celebratory burst (confetti/sparkle)

**Avoid**:
- Continuous ambient animations
- Parallax scrolling effects
- Auto-playing carousels
- Decorative hover effects beyond subtle scale/opacity

All animations: duration-200 to duration-300, easing ease-in-out