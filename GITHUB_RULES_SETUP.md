# Step-by-Step GitHub Branch Protection Setup (100% Free on Public Repos)

Because **Webintel** is a public repository (`https://github.com/ArijeetBanerjee07/Webintel`), GitHub provides **full branch protection rules and rulesets at zero cost**.

Follow this guide to enforce untouchable `main` and protected `staging` branches directly on GitHub.

---

## Prerequisites: Push Initial Branches
Before configuring branch protection rules in GitHub Settings, both `main` and `staging` branches must exist on the remote repository.

Run these commands in your terminal:
```bash
# Push main branch
git push -u origin main

# Push staging branch
git checkout -b staging
git push -u origin staging
```

---

## Part 1: Make `main` Untouchable & Unchangeable Directly

1. Go to your repository on GitHub:
   [https://github.com/ArijeetBanerjee07/Webintel](https://github.com/ArijeetBanerjee07/Webintel)
2. Click on **Settings** (top navigation tab).
3. In the left sidebar, under the **Code and automation** section, click **Branches**.
4. Next to **Branch protection rules**, click **Add branch protection rule** (or **Add rule**).
5. Configure the following fields:
   - **Branch name pattern**: `main`
   - ✅ **Require a pull request before merging**
     - Check: **Require approvals** (Set to `1`)
     - Check: **Dismiss stale pull request approvals when new commits are pushed**
     - Check: **Require review from Code Owners** (optional)
   - ✅ **Require status checks to pass before merging**
     - Check: **Require branches to be up to date before merging**
     - In the search box, search for and select: `Type Check, Lint & Build` (from `.github/workflows/ci.yml`)
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings** *(Enforces these rules on repository administrators/owners too so even you cannot accidentally push directly to main)*
   - ✅ **Restrict deletions**
   - ✅ **Block force pushes**
6. Click **Create** (or **Save changes**).

> **Result**: `main` is now 100% protected. Nobody can push to `main` directly. Any change must come through a PR from `staging` with a passing CI check and an approved review.

---

## Part 2: Protect the `staging` Branch

Now repeat the steps for the `staging` branch:

1. Under **Settings** -> **Branches**, click **Add branch protection rule**.
2. Configure:
   - **Branch name pattern**: `staging`
   - ✅ **Require a pull request before merging**
     - Check: **Require approvals** (Set to `1`)
     - Check: **Dismiss stale pull request approvals when new commits are pushed**
   - ✅ **Require status checks to pass before merging**
     - Check: **Require branches to be up to date before merging**
     - Add status checks:
       - `Verify Branch Naming`
       - `Type Check, Lint & Build`
   - ✅ **Require conversation resolution before merging**
   - ✅ **Restrict deletions**
   - ✅ **Block force pushes**
3. Click **Create** (or **Save changes**).

> **Result**: `staging` is protected. Team members can only submit work via `feature/<purpose>` branches through a PR. The branch naming check guarantees adherence to conventions, and the CI gate ensures tests pass before merging.

---

## Part 3: Configure Merge Button Best Practices (Optional but Recommended)

1. Go to **Settings** -> **General**.
2. Scroll to the **Pull Requests** section:
   - ✅ **Allow squash merging** (recommended: keeps main/staging git history clean and atomic).
   - ✅ **Automatically delete head branches** (cleans up remote `feature/*` branches automatically when merged).

