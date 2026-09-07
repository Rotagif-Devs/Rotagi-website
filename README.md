# ROTAGIF - Empowering African Girl Innovators

ROTAGIF is a dedicated platform designed to equip African girls and women with AI literacy, digital skills, and leadership confidence. This web application serves as the primary hub for program discovery, community events, and an integrated Learning Management System (LMS) for registered students.

## 🚀 Technical Stack

- **Framework**: [Next.js 16+](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [TanStack React Query](https://tanstack.com/query/latest) & React Context API
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with Zod/HookForm resolvers
- **Networking**: Axios & Native Fetch API
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Components**: Headless UI, Swiper (for carousels)

## 📂 Project Structure

```text
├── app/                  # Next.js App Router (Layouts, Pages, Groups)
│   ├── (auth)/           # Legacy learner auth routes (Login, Signup, Reset)
│   ├── (site)/           # Public marketing and info pages (Header/Footer)
│   ├── admin/            # Internal CMS/admin dashboard (own layout)
│   ├── program/[slug]/   # Legacy per-program learner dashboard (separate from the cohort portal)
│   └── mentor/           # Standalone mentor landing page
├── components/           # UI Components organized by feature/domain
│   ├── globalComp/       # Site-wide components (Header, Footer, CTA)
│   ├── ui/               # Core atomic components (Button, Modal)
│   └── [feature]/        # Feature-specific components (blog, programs)
├── context/              # React Context providers (ProgramContext, Auth)
├── lib/                  # Core services, API layer, and static data
│   ├── api.ts            # Centralized Fetch/API utility
│   ├── programs.ts       # Program data and helpers
│   └── token.service.ts  # JWT and session management
├── public/               # Static assets (images, icons, fonts)
├── styles/               # Global CSS and Tailwind configurations
└── types/                # TypeScript interfaces and type definitions
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation
```bash
git clone https://github.com/Rotagif-Devs/Rotagi-website.git
cd Rotagi-website
npm install
```

### Environment Setup
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://your-api-endpoint.com
```

### Development
```bash
npm run dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### Build
```bash
npm run build
npm run start
```

## 🔐 Core Features

- **Program Discovery**: Tiered learning pathways based on age and skill level.
- **Dynamic Events**: Keep track of workshops and summits with detailed agendas and speakers.
- **Secure Dashboard**: Private area for students to track progress and chose programs.
- **Authentication Flow**: Full identity management with secure token handling and OTP support.
- **Digital Donations**: Integrated support for mission funding.

## 📄 Documentation for Developers

- **[FRONTEND_DOCUMENTATION.md](./FRONTEND_DOCUMENTATION.md)** — the complete technical reference: full route map, the data/services layer, the two separate auth systems, the cohort portal system, the donation flow, styling conventions, CSP. Start here for anything beyond a quick overview.
- **[DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)** — shorter day-to-day conventions (coding standards, styling, component structure, contribution checklist) for someone actively writing code.
- **`HANDOVER.md`** in the backend repo ([ROTAGIF/ROTAGIF-Backend-codebase](https://github.com/ROTAGIF/ROTAGIF-Backend-codebase)) — organization context, both repos, hosting, third-party services, and where credentials live. Read this first if you're new to the project entirely.
