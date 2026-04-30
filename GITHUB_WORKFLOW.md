# GitHub Workflow

## Default Branch

- Default branch: `main`
- Branch from `main` for new work.

## Issues

Use issues as task trackers. An open issue means "work remains", not necessarily "the app is broken".

- Create an issue for multi-step work such as SEO phases, release checklists, ASO, analytics, or content plans.
- Link related PRs in the issue body.
- Use checklists for sub-tasks.
- Close only after the result is verified or intentionally cancelled.

## Pull Requests

- Use PRs for SEO, landing, visual, deployment, or content changes that benefit from review/history.
- Use `Refs #N` for partial progress.
- Use `Closes #N` only when the PR fully completes the issue.

## Sync Rule

```bash
git fetch --all --prune
git status -sb
git pull --rebase origin main
```

Do not run `git add .` when unrelated local WIP exists. Stage the intended files explicitly.
