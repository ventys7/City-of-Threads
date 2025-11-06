# City of Threads - Replit Configuration

## Overview

City of Threads is a browser-based asynchronous MMO city-building game that combines progression mechanics similar to Clash of Clans (Town Levels 1-12) with the depth of city simulation games like Cities: Skylines. The game features user-generated content (UGC) through microgame creation, spatial puzzle design, and a democratic governance system where players can elect mayors and vote on economic policies.

**Core Game Features:**
- Persistent city building with 5 districts (center, north, south, east, west)
- Town Level progression system (TL1-12) with time-gated advancement
- Dynamic marketplace with adaptive pricing
- Microgame creator with 3 templates (endless runner, puzzle, clicker)
- Spatial puzzle design and solving system
- Democratic governance with mayor/vice-mayor elections and policy voting
- Cooperative heist missions (2-player stealth mechanics)
- Telemetry dashboard for game analytics

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and dev server for fast Hot Module Replacement (HMR)
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and caching

**UI Component Strategy:**
- Radix UI primitives for accessible, unstyled components (dialogs, dropdowns, menus, etc.)
- shadcn/ui component library built on top of Radix UI with "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens
- Custom spacing system using Tailwind units (2, 3, 4, 6, 8, 12, 16)
- Responsive grid layouts: mobile (2 cols) → tablet (4 cols) → desktop (6 cols)

**Typography & Design System:**
- Google Fonts: Inter (UI/stats/numbers) and Outfit (headings/display text)
- HSL-based color system with CSS variables for light/dark mode support
- Custom border radius scale (sm: 3px, md: 6px, lg: 9px)
- Elevation system using opacity-based overlays (elevate-1: 3%, elevate-2: 8%)

**State Management Approach:**
- Server state via React Query with custom hooks (usePlayer, useBuildings, useShopItems, etc.)
- Local UI state with React hooks (useState, useEffect)
- No global state library (Redux/Zustand) - server state kept fresh through queries
- Query invalidation patterns for optimistic updates on mutations

### Backend Architecture

**Server Framework:**
- Express.js server with TypeScript for RESTful API
- Middleware: JSON body parsing, URL encoding, request logging with duration tracking
- Custom logging function with formatted timestamps
- HTTP server creation for potential WebSocket integration

**API Design Pattern:**
- RESTful endpoints with resource-based routing (`/api/players/:id`, `/api/buildings/player/:playerId`)
- CRUD operations for all game entities (players, buildings, shop items, microgames, puzzles, policies, heists)
- Validation using Zod schemas derived from Drizzle ORM schema definitions
- Error handling with appropriate HTTP status codes (400, 404, 500)
- JSON response format with error objects: `{ error: "message" }`

**Storage Layer Abstraction:**
- IStorage interface defining all database operations
- Separation of concerns: routes handle HTTP, storage handles data persistence
- Promise-based async/await pattern throughout
- Operations grouped by entity type (Players, Buildings, Shop, Inventory, Microgames, Puzzles, etc.)

### Data Storage Solutions

**Database Choice:**
- PostgreSQL as the primary database (via Neon serverless driver)
- Connection via `DATABASE_URL` environment variable
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with TypeScript types generated from Drizzle schema

**Schema Design:**
- `players`: Core user data with town progression (coins, credits, townLevel, tutorialCompleted)
- `buildings`: Spatial entities tied to players (type, level, district, position, upgrade state)
- `shopItems`: Global marketplace inventory with dynamic pricing (basePrice, currentPrice, stock, priceVolatility)
- `inventory`: Player-owned items (many-to-many relationship between players and shop items)
- `microgames`: UGC content with moderation flags (template, plays, shares, quarantined, approved)
- `spatialPuzzles`: 3D puzzle definitions (district, difficulty, completions, puzzleData as JSONB)
- `policies`: Governance proposals (parameter, currentValue, proposedValue, votes, status)
- `governance`: Mayor/vice-mayor tracking with election mechanics
- `heists`: Cooperative mission state (leader, partner, status, reward, reputationRisk)
- `transactions`: Economic activity logging (buyer, seller, item, price, quantity)
- `telemetryEvents`: Analytics events (eventType, playerId, metadata as JSONB)
- `ugcReports`: Content moderation system (reporterId, contentType, contentId, reason)

**Database Patterns:**
- UUID primary keys generated via `gen_random_uuid()`
- Timestamps for tracking creation and activity (createdAt, lastActive, upgradeCompletesAt)
- JSONB columns for flexible data storage (puzzleData, metadata, waypointData)
- Boolean flags for state management (upgrading, quarantined, approved, tutorialCompleted)
- Foreign key relationships without explicit constraints (application-level enforcement)

### Authentication and Authorization

**Current State:**
- No authentication system implemented in the provided code
- Player identification via localStorage (`cityofthreads_player_id`)
- API endpoints accept player IDs as parameters without verification
- Session management prepared via `connect-pg-simple` (included in dependencies but not configured)

**Planned Approach:**
- Express session middleware with PostgreSQL session store
- Cookie-based authentication with secure session tokens
- Player ownership validation in API routes before mutations
- Optional social auth integration points

### External Dependencies

**Core Runtime Dependencies:**
- `@neondatabase/serverless`: Serverless PostgreSQL driver for Neon database
- `drizzle-orm` + `drizzle-zod`: Type-safe ORM with Zod schema generation
- `express`: Web server framework
- `react` + `react-dom`: UI library
- `@tanstack/react-query`: Async state management
- `wouter`: Lightweight routing
- `zod`: Runtime type validation

**UI Component Libraries:**
- 20+ `@radix-ui/*` packages for accessible primitives (dialogs, dropdowns, tooltips, etc.)
- `class-variance-authority`: Type-safe variant styling
- `tailwindcss`: Utility-first CSS framework
- `cmdk`: Command palette component
- `embla-carousel-react`: Touch-friendly carousel
- `date-fns`: Date manipulation utilities

**Development Tools:**
- `tsx`: TypeScript execution for dev server
- `esbuild`: Fast bundling for production server build
- `vite`: Frontend build tool with HMR
- `@vitejs/plugin-react`: React support for Vite
- Replit-specific plugins: runtime error modal, cartographer, dev banner

**Build Configuration:**
- Development: `tsx server/index.ts` with NODE_ENV=development
- Production build: Vite builds client to `dist/public`, esbuild bundles server to `dist/index.js`
- Database migrations: `drizzle-kit push` for schema synchronization
- TypeScript strict mode enabled with path aliases (`@/*`, `@shared/*`, `@assets/*`)

**Asset Management:**
- Generated game assets stored in `attached_assets/` directory
- Icons for buildings, items, characters, and UI elements
- Vite alias `@assets` for asset imports in components
- Image files named with descriptive prefixes and hash suffixes

**PWA Support:**
- Progressive Web App manifest configured for standalone mobile experience
- Service worker capability (manifest.json present but no SW implementation)
- Apple mobile web app meta tags for iOS home screen installation
- Theme color customization (#1e40af blue)

**Analytics & Telemetry:**
- Custom telemetry events tracked via `telemetryEvents` table
- Metrics tracked: DAU, session length, microgame plays/shares, transactions, TL upgrades
- Dashboard visualization of key metrics with trend indicators
- Mock data structure prepared for real-time analytics integration