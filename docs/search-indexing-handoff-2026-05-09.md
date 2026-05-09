# Search Indexing Handoff - 2026-05-09

## Current Scope

- Google/Naver technical SEO is already crawlable: `robots.txt` allows the site and points to `https://weeple.app/sitemap.xml`.
- The Play Store public URL is still withheld until the listing stops returning 404 externally.
- Naver blog or external content seeding is out of scope for this pass.

## URLs To Inspect Or Request

- `https://weeple.app/`
- `https://weeple.app/guides/couple-budget-app`
- `https://weeple.app/guides/budget-app-recommendation`
- `https://weeple.app/guides/shared-budget-app-comparison`
- `https://weeple.app/guides/shared-budget`
- `https://weeple.app/guides/natural-language-budget`
- `https://weeple.app/sitemap.xml`

## Google Search Console

Google's unauthenticated sitemap ping endpoint is deprecated, so sitemap submission and URL indexing requests must be done from Search Console for the verified property.

Submit or resubmit:

- `https://weeple.app/sitemap.xml`

Then use URL Inspection for the high-intent pages above and request indexing where available.

## Naver Search Advisor

This repo now includes an IndexNow key file:

- `public/09b2b5675dfabafa7699563a994f1611.txt`

After deployment, notify Naver with:

```bash
node scripts/notify-indexnow.mjs
```

Expected success status is `200` or `202`.
