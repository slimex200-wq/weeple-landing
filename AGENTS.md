<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI Harness

This repository uses the shared project harness. Before making changes, read:

1. `PROJECT_STATE.md` — current status, active goal, blockers, and next work.
2. `CHECKS.md` — commands and manual checks that prove a change is safe.
3. `DECISIONS.md` — product and technical decisions that should not be re-litigated casually.
4. `GITHUB_WORKFLOW.md` — issue, branch, PR, and sync rules.
5. `README.md` — setup and repository basics.

## Operating Rules

- Preserve user changes and untracked work. Check `git status --short` before edits.
- Do not invent product claims, features, metrics, or screenshots. Verify against source files or documented decisions.
- Keep visual changes consistent with the existing landing direction; avoid generic template copy.
- For Next.js behavior, prefer local docs under `node_modules/next/dist/docs/` because this project uses a newer Next version.
- After meaningful changes, run the smallest relevant check from `CHECKS.md` and record any known gap in the final response.
- Update `PROJECT_STATE.md` at handoff when status, next work, blockers, or verification changes.
