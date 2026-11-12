# Webintel Team Development & Branching Rules

Welcome to the **Webintel** repository. To maintain a stable, clean, and reliable codebase across our engineering team, everyone must adhere to the branching and review rules defined below.

---

## 1. Branch Hierarchy

| Branch | Purpose | Protection Level | Who Can Push? |
| :--- | :--- | :--- | :--- |
| **`main`** | **Production Environment** | **Strictly Untouchable** (Protected) | Nobody. Only merged via approved PR from `staging`. |
| **`staging`** | **Pre-Production / Integration** | **Protected** | Nobody directly. Only merged via approved PR from `feature/*`. |
| **`feature/<purpose>`** | **Feature & Task Development** | Working Branch | Developers push and open PR to `staging`. |

> **Important**: Direct pushes to `main` and `staging` are prohibited by GitHub Branch Protection.

---

## 2. Branch Naming Rules

Every new feature or task **must** follow this naming convention:

```bash
feature/<purpose-in-kebab-case>
```

### Examples:
- `feature/user-authentication`
- `feature/dashboard-analytics`
- `feature/api-rate-limiter`
- `feature/payment-webhook`

*(For bug fixes or maintenance tasks, use `fix/<purpose>` or `chore/<purpose>`)*.

---

## 3. End-to-End Developer Workflow

### Step 1: Sync with Staging and Create your Feature Branch
Always start your work from the latest `staging` branch:

```bash
# Checkout staging and pull the latest changes
git checkout staging
git pull origin staging

# Create and switch to your feature branch
git checkout -b feature/user-authentication
```

---

### Step 2: Implement Your Changes & Run Quality Checks Locally
Work on your feature. Before committing and pushing, run all required CI checks locally to ensure zero failures:

```bash
# Run all checks in one command (typecheck + lint + build)
npm run check

# Or run individually:
npm run typecheck    # Verifies TypeScript compiler types
npm run lint         # Runs ESLint code style and quality rules
npm run build        # Verifies production Next.js build
```

---

### Step 3: Commit and Push
Follow conventional commit messages:

```bash
git add .
git commit -m "feat(auth): implement session validation and sign-in view"
git push -u origin feature/user-authentication
```

---

### Step 4: Create a Pull Request (PR) to `staging`
1. Navigate to the GitHub repository: `https://github.com/ArijeetBanerjee07/Webintel`
2. Open a Pull Request:
   - **Base Branch**: `staging`
   - **Compare Branch**: `feature/user-authentication`
3. Fill in the PR description using the automated PR template.
4. GitHub Actions CI will automatically run:
   - **Branch Naming Check**: Ensures the branch name adheres to `feature/*`.
   - **Type Check, Lint & Build**: Runs TypeScript validation, ESLint checks, and production Next.js build.
5. Request a review from the repo owner / lead.

---

### Step 5: Code Review & Approval
- The repo owner / lead inspects the code diff.
- Once approved and all CI checks are green, merge the PR into `staging` (Squash & Merge recommended).
- Delete the remote feature branch upon successful merge.

---

### Step 6: Promoting from `staging` to `main` (Production Release)
Once features in `staging` are tested and validated:
1. Open a Pull Request:
   - **Base Branch**: `main`
   - **Compare Branch**: `staging`
2. Title the PR appropriately (e.g., `release: v1.0.1 - user authentication and dashboard`).
3. Automated CI checks run against `main`.
4. The repo owner reviews, approves, and merges the PR into `main`.
5. The production deployment triggers automatically.

---

## 4. Local Development Reference

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local Next.js dev server on `http://localhost:3000` |
| `npm run typecheck` | Validates TypeScript types (`tsc --noEmit`) |
| `npm run lint` | Runs ESLint syntax and code quality checks |
| `npm run build` | Builds optimized production bundle |
| `npm run check` | Runs typecheck, lint, and build sequentially |
| `npm run start` | Starts Next.js production server locally |
