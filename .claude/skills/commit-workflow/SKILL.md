---
name: commit-workflow
description: Issue-first commit workflow for this repository. Use whenever committing, pushing, or opening a PR here — every code change must be documented in a GitHub issue BEFORE committing, then go through branch → clean commit (no AI/Claude attribution) → push → PR → merge. Never commit directly to main.
---

# Issue-first commit workflow

Every code change in this repository follows the same pipeline:

**Issue → branch → commit → push → PR → merge**

No step may be skipped, and nothing is committed directly to `main`.

## 1. Issue first

Before creating any commit, record the change in a GitHub issue:

- New work → create an issue describing **what changed and why**, plus the
  files touched:

  ```bash
  gh issue create --title "<imperative change title>" --body "<what / why / files touched / how verified>"
  ```

- Work continuing an existing issue → add a comment summarising what was
  actually changed:

  ```bash
  gh issue comment <n> --body "<summary of the changes made>"
  ```

The issue body must cover: **what** changed, **why**, **files touched**, and
**how it was verified**.

## 2. Branch

```bash
git checkout -b <type>/<short-slug>
```

Types: `feat/`, `fix/`, `docs/`, `chore/`, `refactor/`. One logical change
per branch. If the working tree has unrelated changes, stash or split them
first.

## 3. Commit — clean messages only

- Imperative mood, concise subject, body explaining what/why when needed.
- **HARD RULE: no AI attribution of any kind.** Commit messages must NOT
  contain `Co-Authored-By: Claude`, "Generated with Claude Code", or any
  similar AI/Claude attribution lines or emoji footers. This applies to
  every commit, amend, and squash message.

## 4. Push

```bash
git push -u origin <branch>
```

## 5. Pull request

```bash
gh pr create --base main --head <branch> --title "<imperative title>" --body "..."
```

- Body: summary of the changes + how they were verified.
- Link the issue with `Closes #<n>` so the merge closes it automatically.
- **PR titles and bodies must also be free of AI/Claude attribution** —
  squash merges turn the PR title/body into the commit message on `main`.

## 6. Merge

```bash
gh pr merge <n> --squash --delete-branch
git checkout main && git pull
```

Squash keeps `main` linear (one commit per PR). After merging, confirm the
squash commit message on `main` is clean and the linked issue closed.
