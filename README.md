# Nexus Writer Frontend

The frontend for Nexus Writer — a writing app of the future.

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Language**: TypeScript
- **State Management**: TanStack React Query
- **Editor**: TipTap
- **UI**: Radix UI, Recharts, Lucide Icons, CSS Modules
- **Forms**: react-hook-form + Zod
- **Realtime**: Socket.IO

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
├── app/
│   ├── (app)/              # Authenticated app routes
│   │   ├── dashboard/      # Story dashboard
│   │   ├── stories/        # Story detail & analytics
│   │   └── chapters/       # Chapter editor
│   ├── (auth)/             # Auth routes (login, register)
│   ├── hooks/              # React hooks organized by domain
│   │   ├── auth/
│   │   ├── stories/
│   │   ├── chapters/
│   │   ├── editor/
│   │   ├── jobs/
│   │   ├── targets/
│   │   ├── analysis/
│   │   └── common/
│   ├── services/           # API service layer
│   ├── types/              # TypeScript types organized by domain
│   │   ├── ai/            # AI analysis response types + mappers
│   │   └── api/           # Raw API response types
│   └── lib/                # Utility functions
├── components/             # UI components organized by domain
│   ├── common/             # Shared (Button, Input, Modal, Toast)
│   ├── layout/             # App layout (Navbar, QueryClientProvider)
│   ├── auth/               # Auth components
│   ├── dashboard/          # Dashboard components
│   ├── stories/            # Story detail components
│   ├── chapters/           # Chapter components
│   ├── editor/             # TipTap editor
│   ├── analytics/          # Analytics & KPI components
│   └── jobs/               # Background job components
└── proxy.ts                # Dev proxy config
```
