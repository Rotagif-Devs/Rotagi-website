# ROTAGIF Frontend — Technical Documentation

Live site: https://www.rotagif.com/
Repo: https://github.com/Rotagif-Devs/Rotagi-website
Hosting: Vercel (auto-deploys on push to `main`)

## 1. Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Library**: React 19
- **Styling**: Tailwind CSS 4
- **State/Data**: TanStack React Query, React Context API
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod/HookForm resolvers
- **Networking**: Native `fetch` (via `lib/api.ts`), Axios where used ad hoc
- **Icons**: Lucide React, React Icons
- **Components**: Headless UI, Swiper (carousels)

## 2. Project Structure

```
app/            Next.js App Router — route groups: (site), (auth), admin/, program/, mentor/
components/     React components, grouped by feature/domain
lib/            API client, per-domain services, static data helpers, token utils
context/        AdminContext (admin session), ProgramContext (selected program)
types/          Shared TypeScript types
data/           Static data (e.g. data/programs)
hooks/          Custom hooks (e.g. useDashboard, useAnalytics)
public/         Static assets
```

Route groups:
- **`app/(site)/`** — public marketing site, wrapped by `Header`/`Footer` via `app/(site)/layout.tsx` — **except** `/cohort/portal*` paths, which that layout explicitly suppresses Header/Footer for (a full-screen portal experience).
- **`app/(auth)/`** — legacy learner auth flows (login/signup/otp/password reset), wrapped in a `LeftPanel` layout.
- **`app/admin/`** — CMS/admin dashboard, its own dark sidebar layout, gated by `AdminContext`.
- **`app/program/[slug]/`** — legacy per-program learner dashboard/courses, separate from the cohort portal system (`DashboardProvider`/`Sidebar`, largely stubbed).
- **`app/mentor/`** — standalone mentor info/apply landing, separate from `(site)/mentors`.

## 3. Route Map

### `app/(site)` — public marketing pages

| Path | Description |
|---|---|
| `/` | Homepage — Hero, Mission, Programs, Marquee, Impact, Partners, Updates, Testimonials, FAQ, CTA |
| `/about` | Mission, story, SDGs, values, leadership team carousel |
| `/blog` | Blog index — featured-post spotlight + category filter/search grid |
| `/blog/[slug]` | Single blog post detail |
| `/child-protection` | Child protection policy |
| `/code-of-conduct` | Code of conduct policy |
| `/cohort` | Cohort/scholarship marketing landing (course grid, "Join Waitlist" CTAs to an external MS Forms link — not the learner portal) |
| `/cohort/portal` | Program picker — lists `COHORT_PROGRAMS`, links to each program's portal |
| `/cohort/portal/[program]` | Per-program learner portal — `CohortPinGate` until unlocked, then `CohortPortalDashboard` |
| `/contact` | Contact form |
| `/donate`, `/donate/success`, `/donate/failed` | Donation flow (see §9) |
| `/events`, `/events/[slug]`, `/events/she-empower` | Events listing/detail/dedicated landing |
| `/faq` | FAQ accordion |
| `/mentors`, `/mentors/apply` | Mentor recruitment info + application form |
| `/partner`, `/partner/inquiry` | Partnership landing + inquiry form |
| `/privacy` | Privacy policy (NDPA 2023) |
| `/programs`, `/programs/[slug]` | Program pathways, filterable by age bracket — static data (`lib/programs.ts`), not API-backed |
| `/sheempower` | "She Empower" initiative page |
| `/team` | Team &amp; Advisory Board — real staff/board members plus placeholder "coming soon" slots |
| `/terms` | Terms &amp; conditions |
| `/volunteer` | Volunteer recruitment + application form |

### `app/(auth)` — legacy learner auth flows

| Path | Description |
|---|---|
| `/login`, `/signup` | Learner login/registration |
| `/forgotpassword` | Request a password-reset code |
| `/otp` | Enter a one-time code (reads `email` query param) |
| `/resetpassword` | Set a new password after OTP/reset-code verification |

### `app/admin` — internal CMS/admin dashboard

| Path | Description |
|---|---|
| `/admin/login` | Admin login (redirects to dashboard if already authenticated) |
| `/admin/dashboard` | Overview — recent blogs/events, stats widget |
| `/admin/dashboard/blog`, `/blog/new`, `/blog/[id]/edit` | Blog CRUD |
| `/admin/dashboard/events`, `/events/new`, `/events/[slug]/edit` | Event CRUD |
| `/admin/dashboard/cohort` | Cohort portals index — 3 programs, "Configured"/"Needs setup" status |
| `/admin/dashboard/cohort/[program]` | Per-program config — Settings / Attendance / Certificates tabs (see §8) |

No `users` subsection exists under the admin dashboard — only blog, events, and cohort.

### Other route groups

| Path | Description |
|---|---|
| `/mentor` | Standalone mentor hero + "who can apply" page (distinct from `(site)/mentors`) |
| `/program/[slug]/dashboard` | Legacy per-program learner dashboard — **not** the cohort portal system |
| `/program/[slug]/courses` | Stub placeholder |

## 4. Data Layer (`lib/`)

### `lib/api.ts` — `apiFetch()`

**Base URL**: `(NEXT_PUBLIC_API_BASE_URL || NEXT_PUBLIC_API_URL || '')`, trailing slashes stripped.

**Token attachment — the one subtle, load-bearing detail**:
```ts
const callerSpecifiedToken = options ? 'accessToken' in options : false;
const token = callerSpecifiedToken ? options!.accessToken : (typeof window !== 'undefined' ? getAccessToken() : null);
```
This checks whether the caller passed the `accessToken` **key** at all — not whether its value is `undefined`. Cohort service calls always pass `accessToken: getCohortToken(program) ?? undefined`, so the key is present even when a learner's token is missing/expired. This matters: without this distinction, `apiFetch` would fall through to `getAccessToken()` (the **admin** token) and silently attach an unrelated admin credential to a cohort request. Any call that never sets `accessToken` at all (most admin service calls) gets the admin token auto-attached from localStorage as normal.

**Silent-refresh-on-401**:
```ts
const eligibleForRefresh =
  res.status === 401 &&
  !callerSpecifiedToken &&   // cohort/PIN or explicit-token callers excluded
  !!token &&
  !options?._isRefreshRetry &&
  !path.startsWith('/auth/');
```
Only requests where the admin token was auto-attached are eligible for silent refresh — this is the same `callerSpecifiedToken` check, applied in reverse. Cohort/PIN tokens and any explicit-token caller manage their own lifecycle and see a raw 401, never get funneled into an admin-session refresh/redirect. (This was previously a real bug: an expired cohort token used to trigger an admin-refresh attempt that failed and redirected learners to `/admin/login` — fixed by this exact distinction.)

On an eligible 401: calls `refreshAccessToken()` (deduplicated via a module-level `refreshPromise` so concurrent 401s share one `/auth/refresh` call), then retries once with `_isRefreshRetry: true`. `performRefresh()` posts `{refreshToken}`; on success stores new tokens and dispatches `SESSION_REFRESHED_EVENT`; on failure clears tokens and dispatches `SESSION_EXPIRED_EVENT`.

**Timeouts**: mutations (POST/PUT/PATCH/DELETE) get 30s; browser GETs get 15s (raised from 3s to survive Render cold starts, ~20–50s wake time); SSR GETs get 3s (fail fast, don't block render).

**Body handling**: `FormData` passed through raw (browser sets the multipart boundary); otherwise JSON-stringified.

### `lib/token.service.ts`
localStorage wrapper for the **admin** system's access/refresh tokens only (`get`/`set`/`clear`). Not used by the cohort system, which has its own sessionStorage-based storage (§5B).

### `lib/services/` (primary API surface)

| Service | Exports |
|---|---|
| `auth.service.ts` | `register`, `login`, `adminLogin` (same `/auth/login`, requires `programSlug`), `forgotPassword`, `resendVerification`, `verifyResetCode`, `resetPassword`, `createPassword` |
| `admin.service.ts` | `adminService`: blog CRUD + image upload, event CRUD + image upload, mentor application list/update, `getStats` |
| `analytics.service.ts` | `trackPageView` — persistent `rv_visitor_id` in localStorage, swallows errors |
| `cohort.service.ts` | The entire cohort portal API surface — ~30 exported functions covering both learner (PIN validate, dashboard, attendance mark, certificate lookup) and admin (settings CRUD, attendance window/export/clear, certificate template/toggle, assignments CRUD) sides. See §8. |
| `contact.service.ts` | `submitContactMessage` (honeypot + captcha, `credentials: "omit"`) |
| `donation.service.ts` | `initDonation`, `verifyDonation`, `capturePayPalOrder` |
| `mentor.service.ts` | `submitMentorApplication` (multipart, includes CV) |
| `newsletter.service.ts` | `subscribeNewsletter` |
| `partnership.service.ts` | `submitPartnershipInterest` |
| `program.service.ts` | `getPrograms` (public, `credentials: 'omit'`) |
| `public.service.ts` | `getEvents`, `getEventBySlug`, `getBlogPosts`, `getBlogPostBySlug` — includes image-URL normalization, Tiptap-style content parsing, fallback-search-by-slug |
| `volunteer.service.ts` | `submitVolunteerApplication` (multipart FormData) |

Legacy/static (non-`services/`) files still in use: `lib/programs.ts` (static program data), `lib/ambassador.ts`, `lib/blog.ts`, `lib/blogs.ts`, `lib/dashboard.ts`, `lib/event.ts`, `lib/sheempower.ts`, `lib/terms.ts`, `lib/utils.ts` (`cn()` classname helper).

## 5. Auth / Session Handling — TWO SEPARATE, NON-OVERLAPPING SYSTEMS

### A. Admin JWT session (`context/AdminContext.tsx` + `lib/token.service.ts`)

- **Storage**: localStorage — `accessToken`, `refreshToken` (via `token.service.ts`), plus `adminUser` (JSON: `{email, role, lastLogin, token}`) set directly by `AdminContext`.
- **Login**: `AdminContext.login(email, password, programSlug)` → `/auth/login`, stores `adminUser` + tokens.
- **1-hour idle expiry**: on mount, compares `Date.now() - lastLogin` against 1 hour; also an active `setTimeout` fires `logout()` at that deadline while the tab stays open.
- **Silent-refresh integration**: `SESSION_REFRESHED_EVENT` → bumps `lastLogin` to now (slides the idle window forward on any successful background refresh, so an actively-working admin isn't logged out purely on wall-clock). `SESSION_EXPIRED_EVENT` → `logout()`.
- **Logout**: clears state + localStorage, `router.push("/admin/login")`.
- Guarded by `app/admin/dashboard/layout.tsx` (redirects to `/admin/login` if unauthenticated).

### B. Cohort learner auth (PIN-based, sessionStorage, per-program)

- **Storage**: sessionStorage, key `cohort_token_${program}` — dies with the tab, scoped per program (a `product-design` token doesn't work for `ai-video-creation`).
- **Login flow**: `CohortPinGate.tsx` → `cohortService.validateAccessPin(program, pin)` → `POST /api/cohort/${program}/access` (explicitly passes `accessToken: null` to bypass any admin-token auto-attach) → stores the returned token.
- **Every subsequent learner call** passes `accessToken: getCohortToken(program) ?? undefined` — the exact case `apiFetch`'s `callerSpecifiedToken` check exists for (§4).
- **Expiry handling**: `CohortProgramPortalPage` treats any dashboard-fetch error matching `/unauthorized/i` as a normal session timeout — clears the token and drops back to the PIN gate, rather than surfacing a raw error or (the old bug) redirecting to `/admin/login`.
- **Logout**: the dashboard's "Log Out" button calls `clearCohortToken(program)` then reloads.
- No shared identity with the admin system — different issuing endpoints, different Web Storage APIs, and `apiFetch` explicitly keeps them from crossing over.

## 6. Context Providers (`context/`)

- `AdminContext.tsx` — admin auth/session state (§5A)
- `ProgramContext.tsx` — tracks the currently selected program from static `data/programs`

## 7. Types (`types/`)

`ambassador.ts`, `auth.types.ts`, `blog.ts`, `contact.ts`, `dashboard.ts`, `donation.ts`, `event.ts`, `program.ts`, `react-quill-new.d.ts` (module shim), `sheempower.ts`, `terms.ts`, `speaker.ts`.

## 8. The Cohort Portal System

The most complex, most recently-built part of the frontend. `COHORT_PROGRAMS` (in `cohort.service.ts`):
```ts
[
  { slug: "product-design", title: "Product Design (UI/UX)" },
  { slug: "ai-video-creation", title: "AI Video Creation" },
  { slug: "vibe-coding", title: "VIBE Coding" },
]
```
Every program has its own PIN, settings, attendance data, and certificate eligibility list.

### Learner-side flow
1. `/cohort/portal` — static list of the 3 programs.
2. `/cohort/portal/[program]` — checks for a stored token; PIN gate if absent, dashboard if present.
3. `CohortPinGate.tsx` — split-screen PIN entry (image panel + brand-pink form panel).
4. `CohortPortalDashboard.tsx` — top to bottom: **Hero** (welcome header, week tracker context, Log Out) → **WeekTracker** (admin-set `currentWeek`/`totalWeeks`, same for every learner, not per-learner) → **Classes** (Join Live Class / Watch Missed Class, external links) → **individual assignments** (only rendered if the admin used the hidden multi-assignment tab) → **Course Materials + Google Classroom** (external links) → **Attendance** (self-tick `AttendanceMarker` form, gated by an admin-controlled daily open/closed window — the current live mechanism, *not* an external form link) → **Certificate** (`CertificateChecker` form, full name + email against the admin's uploaded eligibility list, renders a composited PNG/PDF on match — the current live mechanism, *not* an external folder link) → **Community &amp; Support**.

The `attendanceFormLink`/`certificateFolderLink` settings fields still exist in the data model and are saved if present, but the corresponding admin Settings UI inputs were intentionally removed — the self-tick/lookup mechanism is the current design; the external-link version was tried and reverted.

### Admin-side: `/admin/dashboard/cohort/[program]`
Visible tabs: **Settings**, **Attendance**, **Certificates**. An **Assignments** tab (`CohortAssignmentsManager`) exists in code but is commented out of the tab list — the learner dashboard now uses a single admin-set Google Classroom link instead. The component and its service functions still work if re-enabled.

- **Settings** — Access PIN, Cohort Header (name/number/track code/name/mode), Program Journey (totalWeeks 1–52, currentWeek), My Classes (live/missed class links + schedule), Course Materials + Google Classroom links, Community &amp; Support link.
- **Attendance** — spreadsheet upload (Email/Date/Status), `CohortAttendanceWindowControl` (open/close today's window, live 5s-poll tick count, export to Excel, clear-all with confirmation).
- **Certificates** — spreadsheet upload (Email/Full Name eligibility list), `CohortCertificateTemplateEditor` (upload a template image, click to position the name, font size/color/family, live preview, enable/disable toggle) once at least one eligible learner exists.

## 9. Key Reusable Components

- **`components/ui/`** — `Button.tsx` (polymorphic button/Link, variants primary/secondary/outline/ghost), `Modal.tsx` (overlay with backdrop blur + scroll lock).
- **`components/globalComp/`** — `Header.tsx` (nav = About Us/Programs/Cohort/SHE EMPOWER/Contact — Blog is commented out of the array, hidden per org request; CTA button routes differently based on localStorage admin/learner/program state), `Footer.tsx`, `CTA.tsx`/`PTA.tsx` (banner blocks), `CookieConsent.tsx`, `DonatePrompt.tsx`, `Loader.tsx`, `Videoplayer.tsx`, `VolunteerCTA.tsx`, `WaitlistModal.tsx`.
- **`components/cohort/`** — `CohortPinGate.tsx`, `CohortPortalDashboard.tsx` (§8), `CourseGrid.tsx` (public `/cohort` page course cards, some `available:false` with a locked-state modal).
- **`components/admin/`** — `ActionMenu.tsx`, `AdminEditButton.tsx`, `BlogForm.tsx`, `EventForm.tsx`, `CohortAssignmentsManager.tsx`, `CohortAttendanceWindowControl.tsx`, `CohortCertificateTemplateEditor.tsx`.
  - `BlogForm.tsx`/`EventForm.tsx` both use `react-quill-new` (dynamic-imported, `ssr:false`) for the rich-text body, with a sticky (`position:sticky`) toolbar so it stays visible while scrolling a long post/event. Cover image picking is decoupled from upload: `FileReader.readAsDataURL()` drives only an in-browser `<img>` preview, never the submitted value; the real `File` is held separately and uploaded via `adminService.uploadBlogImage()`/`uploadEventImage()` once the parent record is saved and has a real id (mirrors the backend's Mongo-`Buffer` image storage — see `BACKEND_DOCUMENTATION.md` §"File uploads"). `saveBlog()`/`saveEvent()` only forward `image`/`coverImageUrl` when it's a real `http(s)` URL — `data:` URIs are rejected so a base64 blob can never end up embedded in the post/event document again.

Other feature-scoped component directories (one tree per public page): `About/`, `Event/`, `FeaturedSpeaker/`, `Partner/`, `SignUp/`, `Login/`, `Terms/`, `Volunteer/`, `blogComps/`, `childProtection/`, `contact/`, `dashboard/` (legacy per-program dashboard), `donate/` (§9 below), `forgotpassword/`, `landingpage/`, `mentorship/`, `otp/`, `programs/`, `resetpassword/`, `sheempower/`, `whoCanApply/`.

## 10. Styling Conventions (`app/globals.css`)

Tailwind CSS 4, `@theme` design tokens:

```css
--color-primary: #f8e0ed;      /* pale pink — page/body background */
--color-secondary: #d62d88;    /* brand hot pink — primary buttons, headline accents */
--color-tertiary: #e463a4;
--color-quaternary: #e949a3;
--color-orange: #eb3f2b;
--color-dark: #060000;
--color-gray: #373737;
--color-accent0: #fabfd3;
--background: #f8e0ed;
--foreground: #171717;
```

Fonts: `--font-sans` (DM Sans default), `--font-heading` (Outfit/Cal Sans), plus discrete `--font-cal-sans`/`--font-outfit`/`--font-dm-sans`/`--font-inter` wired via `next/font/google` in `app/layout.tsx`. `h1`–`h5` are hard-set to `font-cal-sans` in `@layer base`.

**Two parallel coloring patterns coexist**: token-based utilities (`bg-primary`, `bg-secondary`, `text-secondary` — the systematic approach), and one-off arbitrary hex values (e.g. `bg-[#D6448D]`/`bg-[#EFEFEF]` on the cohort PIN gate/picker pages, `text-[#D62D88]` on the cohort landing page, `bg-[#e61e8a]` on the Modal footer, `bg-[#41122B]/70`/`bg-[#2D0F21]` hero overlays, `bg-[#050505]` admin sidebar). Several of these are visually close to but not identical to `--color-secondary` (`#d62d88`) — worth reconciling into the token set at some point, not urgent.

## 11. Environment Variables

| Variable | Used in | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | `lib/api.ts`, `next.config.ts` | Backend API base URL — primary |
| `NEXT_PUBLIC_API_URL` | `lib/api.ts` | Fallback if the above isn't set |
| `APP_BASE_URL` | `next.config.ts` | Fallback for `NEXT_PUBLIC_API_BASE_URL` at build time |
| `NODE_ENV` | `next.config.ts` | CSP logic |

No `.env*` file exists in this repo. Other hardcoded (non-env) values worth knowing about: the Google reCAPTCHA v3 site key is hardcoded directly in `app/Provider.tsx`, and the cohort/programs marketing waitlist link is a hardcoded MS Forms URL repeated across `app/(site)/cohort/page.tsx`.

## 12. Content Security Policy (`next.config.ts`)

A CSP header is applied to all routes. Notable allowances: `js.paystack.co` (script-src), backend hosts on `onrender.com`, `res.cloudinary.com`, `flagcdn.com` (img-src), and `checkout.paystack.com`, `open.er-api.com`, `v6.exchangerate-api.com` (connect-src). `unsafe-eval`/`unsafe-inline` are currently enabled globally per an inline comment ("temporarily always including 'unsafe-eval' to resolve the immediate block") — worth revisiting for production hardening.

## 13. Payment Integrations

Three providers are wired into the donation flow (`components/donate/DonateDetails.tsx` → `DonateComplete.tsx` → `DonateTransform.tsx` → `lib/services/donation.service.ts`):

- **Paystack** — default/auto-selected when the donor's country currency is NGN.
- **PayPal** — default option for non-NGN donors.
- **Flutterwave** — alternate card option for non-NGN donors ("Card (Flutterwave)").

Flow:
1. `DonateDetails.tsx` collects donor info + auto-selects `paystack` for NGN, or lets the user pick `paypal`/`flutterwave` otherwise.
2. `DonateTransform.tsx.handleConfirm()` calls `initDonation()` → backend `POST /donations/init`, passing `provider`, amount, currency, and a `callback_url` of `/donate/success?provider=<provider>`.
3. The backend returns a hosted checkout link; the frontend does a full-page redirect via `window.location.assign(redirectUrl)` — a top-level navigation, not gated by CSP `connect-src`/`frame-src`.
4. On return, `/donate/success/page.tsx` branches by `?provider=`: Paystack calls `verifyDonation(reference)` synchronously; PayPal calls `capturePayPalOrder(reference)`; **Flutterwave is not verified client-side** — shows a "Payment Processing" screen and relies entirely on the backend webhook.

**Status**: fully wired into the frontend UI. Whether live transactions actually settle depends on backend credentials/webhook delivery — recommend a live end-to-end test (small real or sandbox donation) to confirm the webhook path completes.

## 14. Card Image Dimensions

Per site convention, the homepage Updates section and `/events` cards render "fetched post" card images as `width="474" height="593"` (portrait, ~0.8:1) with a matching `aspect-[474/593]` container — confirmed still current in `components/landingpage/UpdatesClient.tsx` and `components/Event/ExploreEvent.tsx`.

**`components/blogComps/BlogCard.tsx` is a deliberate exception, as of the blog redesign**: it now uses a landscape `aspect-[16/10]` thumbnail instead, matching conventional blog-article-card layout (the whole card is also now a single clickable `<Link>`, not just the "Read Story" text). Don't "fix" this back to 474×593 to match the other two — it was intentionally changed.
