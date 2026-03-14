# ROTAGIF Frontend Developer Guide

Welcome to the ROTAGIF development team! This guide is designed to help you hit the ground running and ensure consistency across our codebase.

## 🎨 Design System & Styling

We use **Tailwind CSS 4** for all styling. 

- **Colors**: Primary brand colors are defined in Tailwind's theme. Use the burgundy/pink palette (`#3D1A2A`, `#DB2777`) for consistency.
- **Typography**: 
  - `font-cal-sans`: Used for large headings and display text.
  - `font-dm-sans`: Used for body copy and general UI elements.
- **Standard Widths**: The primary container width for sections is `max-w-[1260px]` or `max-w-7xl` with `mx-auto`.

## 🏗️ Architecture Patterns

### 1. Route Groups
We use Next.js Route Groups to isolate layouts:
- `(site)`: Public pages (includes Header/Footer).
- `(lms)`: Private dashboard pages (minimal layout).
- `(auth)`: Login and registration flows.

### 2. Component Structure
Each feature in `components/` should follow this pattern:
```text
components/programs/
├── ProgramsList.tsx      # Main feature component
├── ProgramCard.tsx       # Sub-component
└── ProgramHero.tsx       # Feature-specific UI
```
**Rule**: If a component is reused in 3+ places, move it to `components/ui/` or `components/globalComp/`.

### 3. Data Fetching (API Layer)
Always use `apiFetch` from `@/lib/api` for server requests. It handles:
- Base URL injection.
- Automatic Authorization headers (`Bearer [token]`).
- Error parsing and JSON safety.

**Example**:
```typescript
import { apiFetch } from '@/lib/api';

const data = await apiFetch<MyType>('/v1/feature');
```

For client-side state, we prefer **TanStack React Query** to handle caching and loading states.

## 🔐 Authentication & Session
- **Tokens**: Stored in `localStorage` under the key `accessToken`.
- **User Data**: Profile info should be fetched and stored in `localStorage` or a dedicated Context.
- **Guards**: Protected routes in `app/(lms)` should include an `useEffect` check for the token and redirect to `/login` if missing.

## 🔄 Animation Philosophy
We use `framer-motion` for micro-interactions.
- **Entry Animations**: Prefer subtle `y: 20` or `y: 40` slides with `opacity`.
- **Transitions**: Keep duration between `0.4` and `0.8` seconds for a premium feel.

## ✅ Contribution Checklist
1. **TypeScript**: Always define interfaces for component props and API responses.
2. **Responsive**: Test every change on mobile (`sm`), tablet (`md`), and desktop (`lg`).
3. **Clean Code**: Remove unused imports and logs before pushing.
4. **Naming**: Use PascalCase for components and camelCase for files/variables (unless they are components).

---
*For any questions, reach out to the lead developer on GitHub.*
