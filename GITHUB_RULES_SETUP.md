# Step-by-Step GitHub Branch Protection & Mandatory Owner Approval Setup

Because **Webintel** is a public repository (`https://github.com/ArijeetBanerjee07/Webintel`), GitHub provides **full branch protection rules, rulesets, and CODEOWNERS enforcement at zero cost**.

Follow this guide to enforce that **NO Pull Request can be merged without your specific review and approval**.

---

## How Mandatory Owner Review Works

We have established a `.github/CODEOWNERS` file:
```
* @ArijeetBanerjee07
```
When you check **"Require review from Code Owners"** in GitHub Branch Protection:
1. Every single pull request touching any file in the repository will **automatically assign `@ArijeetBanerjee07` as the mandatory reviewer**.
2. Even if other team members or collaborators review and approve the PR, the **"Merge" button remains disabled (blocked)** until `@ArijeetBanerjee07` submits an **Approved** review!

---

## Part 1: Enforce Mandatory Review & Protection on `staging`

All feature branches (`feature/*`) target `staging`. Follow these steps:

1. Go to your repository on GitHub:
   [https://github.com/ArijeetBanerjee07/Webintel](https://github.com/ArijeetBanerjee07/Webintel)
2. Click on **Settings** (top navigation tab).
3. In the left sidebar, under **Code and automation**, click **Branches**.
4. Next to **Branch protection rules**, click **Add branch protection rule** (or edit existing rule for `staging`).
5. Set **Branch name pattern**: `staging`
6. Configure the following protection checkboxes:
   - ✅ **Require a pull request before merging**
     - Check: **Require approvals** (Set to `1` or `2`)
     - Check: **Dismiss stale pull request approvals when new commits are pushed** *(Revokes approval if author pushes changes after you approved)*
     - 🌟 **CRITICAL**: Check **Require review from Code Owners** *(Guarantees ONLY @ArijeetBanerjee07 can satisfy the merge requirement)*
   - ✅ **Require status checks to pass before merging**
     - Check: **Require branches to be up to date before merging**
     - Add status checks:
       - `Verify Branch Naming`
       - `Type Check, Lint & Build`
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings** *(Prevents any admin bypass)*
   - ✅ **Restrict deletions**
   - ✅ **Block force pushes**
7. Click **Create** (or **Save changes**).

---

## Part 2: Enforce Mandatory Review & Protection on `main`

Follow the same steps for the production `main` branch:

1. Under **Settings** -> **Branches**, click **Add branch protection rule**.
2. Set **Branch name pattern**: `main`
3. Configure:
   - ✅ **Require a pull request before merging**
     - Check: **Require approvals** (Set to `1`)
     - Check: **Dismiss stale pull request approvals when new commits are pushed**
     - 🌟 **CRITICAL**: Check **Require review from Code Owners**
   - ✅ **Require status checks to pass before merging**
     - Check: **Require branches to be up to date before merging**
     - In status check search box, select: `Type Check, Lint & Build`
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings**
   - ✅ **Restrict deletions**
   - ✅ **Block force pushes**
4. Click **Create** (or **Save changes**).

---

## Part 3: Configure Merge Button Best Practices (Recommended)

1. Go to **Settings** -> **General**.
2. Scroll to the **Pull Requests** section:
   - ✅ **Allow squash merging** (keeps staging/main git history clean and atomic).
   - ✅ **Automatically delete head branches** (cleans up remote `feature/*` branches automatically when merged).
