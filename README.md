# Webintel

**Webintel** is a Next.js web platform built with TypeScript, Tailwind CSS, and strict CI/CD verification gates tailored for team development.

---

## Architecture & Team Git Workflow

The repository enforces a structured, multi-tier release flow:

```
[ Developer Branch ]                [ Pre-Production ]                [ Production ]
feature/<purpose>    ──(PR + CI)──>     staging        ──(PR + CI)──>     main
 (Feature dev)                      (Team review)                     (Untouchable)
```

1. **`main`**: Strictly protected and untouchable. Never pushed directly. Changes enter only via approved PR from `staging`.
2. **`staging`**: Integration environment. Features are merged here via PR for team review and testing.
3. **`feature/<purpose>`**: Developers work on dedicated feature branches named with `feature/<purpose>` (e.g. `feature/user-auth`).

For the full branching rules and workflow guidelines, see [CONTRIBUTING.md](file:///C:/Users/Windows/Desktop/Webintel/CONTRIBUTING.md).  
For the step-by-step GitHub branch protection guide, see [GITHUB_RULES_SETUP.md](file:///C:/Users/Windows/Desktop/Webintel/GITHUB_RULES_SETUP.md).

---

## Automated CI/CD Gates

Every pull request triggers GitHub Actions CI checks (`.github/workflows/ci.yml`):
- **Branch Naming Validation**: Enforces `feature/<purpose>` convention on PRs to `staging`.
- **TypeScript Type Check**: `npm run typecheck` (`tsc --noEmit`).
- **ESLint Code Quality**: `npm run lint`.
- **Next.js Production Build**: `npm run build`.

---

## Getting Started

### 1. Prerequisites
- **Node.js** v20.x or higher
- **npm** v10.x or higher

### 2. Installation
```bash
git clone https://github.com/ArijeetBanerjee07/Webintel.git
cd Webintel
npm install
```

### 3. Development Server
Run the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## Quality & Build Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run check` | `npm run typecheck && npm run lint && npm run build` | Runs all 3 quality checks locally before pushing |
| `npm run typecheck` | `tsc --noEmit` | Strict TypeScript type checking |
| `npm run lint` | `eslint` | ESLint static code analysis |
| `npm run build` | `next build --webpack` | Builds production Next.js application bundle |
| `npm run start` | `next start` | Runs built production server locally |

---

## Hosting & Deployment

Webintel can be deployed seamlessly to:
- **Vercel** (Recommended for Next.js): Connect the GitHub repo and set `main` as the production branch, and `staging` as the preview branch.
- **Netlify**: Connect repository, build command `npm run build`, publish directory `.next`.
- **Docker / Node Container**: Standard Node.js Alpine image running `npm run build && npm run start`.
