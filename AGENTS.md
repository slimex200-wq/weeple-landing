<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes; APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Shared AI Entry Point

This repo is used by Codex/OMX and Claude/OMC. Follow your local runtime rules first; this file only points to project-specific context.

Before changing files, read:

1. `PROJECT_STATE.md` - current status, cancelled directions, next work, blockers, and last verification.
2. `CHECKS.md` - repo-specific verification commands and manual checks.
3. `DECISIONS.md` - product and technical decisions that should not be re-litigated casually.
4. `GITHUB_WORKFLOW.md` - default branch, issue, PR, and sync rules.
5. `README.md` - setup and repository basics.

Project facts in those files override generic assumptions. Keep this file thin; put durable project facts in the dedicated harness files.

## Local Context

- Treat this as the public Weeple marketing surface, not a generic Next.js demo.
- The abandoned `redesign/pixel` direction is not the default path.
- Product claims must be grounded in the app, source, or documented decisions.
